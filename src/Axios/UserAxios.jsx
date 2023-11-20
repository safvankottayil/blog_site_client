import axios from "axios";

 export const  instance = axios.create({
    baseURL: 'https://blog-site-ag18.onrender.com/',
  });

instance.interceptors.request.use(config=>{
  const token=localStorage.getItem('token')?localStorage.getItem('token'):null
  config.headers.Authorization=`Bearer ${token}`
  return config
})
 