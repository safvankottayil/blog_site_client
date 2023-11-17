import React, { useEffect, useState } from "react";
import { GET } from "../Services/userControll";
import Carosel from "./Carosel/Carosel";

function Home() {
  const [blog, setblog] = useState([]);
  const [active,setactive]=useState(0)
 

  useEffect(()=>{
    setTimeout(() => {
        setactive((active+1)%blog.length) 
    }, 3000);
  },[active])


//   function chage(index) {
//     const prev = blog.slice(index);
//     if (prev.length == 3) {
//       setblog([prev[2], prev[0], prev[1]]);
//     } else if (prev.length == 2) {
//       setblog([blog[0], ...prev]);
//     } else {
//       setblog([blog[0], ...prev, blog[1]]);
//     }
//   }

  useEffect(() => {
    GET("")
      .then((res) => {
        if (res.status) {
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
