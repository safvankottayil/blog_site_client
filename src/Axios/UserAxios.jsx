import axios from "axios";

 export const  instance = axios.create({
    baseURL: 'http://10.4.1.234:3000',
  });

instance.interceptors.request.use(config=>{
  const token=localStorage.getItem('token')?localStorage.getItem('token'):null
  config.headers.Authorization=`Bearer ${token}`
  return config
})
 