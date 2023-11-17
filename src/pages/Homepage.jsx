import React from 'react'
import Navbar from '../Componets/Navbar/Navbar'
import Home from '../Componets/Home'

function Homepage() {
  return (
   <>
   <div className=' dark:bg-black dark:text-white min-h-screen'>
   <Navbar/>
   <Home/>
   </div>
  
   </>
  )
}

export default Homepage
