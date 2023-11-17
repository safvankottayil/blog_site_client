// UserContext.js
import { createContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';

const UserContext = createContext();
const UserProvider = ({ children }) => {
  useEffect(()=>{
   setToken(localStorage.getItem('token'))
   setblog(JSON.parse(localStorage.getItem('blog')))
  },[])
  const [token, setToken] = useState(null);
  const [blog,setblog]=useState({})
  const login = (userData) => {
    setToken(userData);
    localStorage.setItem('token',userData)
  };
  const SetBlog=(obj)=>{
    setblog(obj)
    localStorage.setItem('blog',JSON.stringify(obj))
  }
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, login, logout,SetBlog }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };