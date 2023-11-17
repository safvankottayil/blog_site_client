// UserContext.js
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  useEffect(()=>{
   setToken(localStorage.getItem('token'))
  },[])
  const [token, setToken] = useState(null);
  const login = (userData) => {
    setToken(userData);
    localStorage.setItem('token',userData)
  };

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };