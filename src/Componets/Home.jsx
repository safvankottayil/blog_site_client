import React, { useContext, useEffect, useState } from "react";
import { GET } from "../Services/userControll";
import Carosel from "./Carosel/Carosel";
import { UserContext } from "../Context/Context";

function Home() {
  
  const [blog, setblog] = useState([]);
  const [active,setactive]=useState(0)
  const {SetHome}=useContext(UserContext)
 

  useEffect(()=>{
    setTimeout(() => {
        setactive((active+1)%blog.length) 
    }, 3000);
  },[active])
  useEffect(()=>{
    if(localStorage.getItem('home')){
      setblog(JSON.parse(localStorage.getItem('home')))
    }
  },[])


/

  useEffect(() => {
    GET("")
      .then((res) => {
        if (res.status) {
          SetHome(res.blog)
          setblog(res.blog);
         setactive(0)
        }
      })
      .catch((err) => {
       
      });
  }, []);
  return (
   <Carosel images={blog} />
  );
}

export default Home;
