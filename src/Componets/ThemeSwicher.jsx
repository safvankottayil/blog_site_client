import React, { useEffect, useState } from 'react'
import{TbMoonFilled} from 'react-icons/tb'
import {BsCloudSun} from 'react-icons/bs'
function ThemeSwicher() {
    const [Theme,setTheme]=useState(null)
    useEffect(()=>{
        if(window.matchMedia('prefer-color-scheme:dark').matches){
            setTheme('dark')
        }else{
            setTheme('light')
        }
    },[])
    useEffect(()=>{
       if(Theme==='dark'){
        document.documentElement.classList.add('dark')
       }else{
        document.documentElement.classList.remove('dark')
       }
    },[Theme])
    const handleThemechange=()=>{
        setTheme(Theme==='dark'?"light":'dark')
    }
  return (
    
      <button className='border-2 border-black dark:border-white w-12 h-12 flex items-center justify-center rounded-md' onClick={handleThemechange}>{Theme=='dark'?<BsCloudSun className='w-6 h-7'/>:<TbMoonFilled className='w-6 h-7'/>}</button>
    
  )
}

export default React.memo(ThemeSwicher)
