import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Routes,Route, useNavigate, Navigate } from 'react-router-dom'
import Login from '../Componets/Login/Login'
import Signup from '../Componets/Signup/Signup'
import Home from '../pages/Homepage'
import { UserContext } from '../Context/Context'
import Addblog from '../pages/Addblog'
import Blogpage from '../pages/Blogpage'
function User({token}) {
  
  // const [token,setToken]=useState()
console.log(token,'///');
  return (
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/blog' element={<Blogpage/>}/>
    <Route path='/addblog' element={token?<Addblog/>:<Navigate to={'/login'} />} />
    <Route path='/login' element={token?<Navigate to={'/'}/>:<Login/>} />
    <Route path='/signup' element={token==null?<Signup/>: <Navigate to={'/'}/>} />
  </Routes>
  )
}

export default User
