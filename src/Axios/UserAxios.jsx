import axios from "axios";
const url='https://blog-site-ag18.onrender.com/'
 export const  instance = axios.create({
    baseURL: url,
  });

instance.interceptors.request.use(config=>{
  const token=localStorage.getItem('token')?localStorage.getItem('token'):null
  config.headers.Authorization=`Bearer ${token}`
  return config
})
 