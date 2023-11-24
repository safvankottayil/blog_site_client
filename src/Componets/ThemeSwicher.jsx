import React, { useEffect, useState } from 'react'
import{TbMoonFilled} from 'react-icons/tb'
import {BsCloudSun} from 'react-icons/bs'
function ThemeSwicher() {
    const [Theme,setTheme]=useState(null)
    useEffect(()=>{
        if(localStorage.getItem('theme')){
            setTheme(localStorage.getItem('theme'))
        }else{
            setTheme('light')
            localStorage.setItem('theme','light')
        }
       
       
    },[])
    useEffect(()=>{
       if(Theme==='dark'){
        localStorage.setItem('theme','dark')
        document.documentElement.classList.add('dark')
       }else{
        localStorage.setItem('theme','light')
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
