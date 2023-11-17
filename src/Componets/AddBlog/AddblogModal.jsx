import React, { useRef, useState } from "react";
import { GET, POST } from "../../Services/userControll";
import { useNavigate } from "react-router-dom";

function AddblogModal({update}) {
  const categoryRef = useRef(null);
  const navigate=useNavigate()
  const [errmsg, setErr] = useState(null);
  const [errTmsg, setTErr] = useState(null);
  const [errImsg, setIErr] = useState(null);
  const imageRef=useRef(null)
  const titleRef=useRef(null)
  async function Submit() {
    if(titleRef.current.value==""){
      setTErr("This field required")
    }else if(titleRef.current.value.length<15){
      setTErr("Minimun 15 charecter");
    }else if (categoryRef.current.value == "") {
      setTErr(null)
      setErr("This field required");
    } else if (categoryRef.current.value.length < 4) {
      setErr("Minimun 4 charecter");
    } else if(!imageRef.current.files[0]){
      setErr(null);
      setIErr("This field is required");
    } else {
      
      const res = await POST("/addblog", {
        category: categoryRef.current.value,
        title:titleRef.current.value,
        image:imageRef.current.files[0]
      });
      if(res.status){
        update(2)
        navigate('/addblog?id='+res.blogId)
      }
    }
   
  }
  async function Previes(){
    const res=await  GET('/previesblog')
    if(res.status){
      if(res.id==null){

      }else{
        navigate("/addblog?id="+res.id)
        update(2)
      }
    }
 
     }
  return (
    <div className="flex bg-black opacity-70 fixed top-0 justify-center  left-0 z-20 w-full h-screen ">
      <div className="w-96 flex flex-col h-fit rounded-md  transition-all duration-300 translate-y-3/4 bg-white">
        <div className="flex justify-center py-3">
          <h1 className=" font-extrabold uppercase">Add Blog</h1>
        </div>
        <div className="flex flex-col items-center px-4">
          <label
            htmlFor="category"
            className="w-full font-display pb-[2px] pl-1"
          >
            Add Title
          </label>
          <input
            ref={titleRef}
            placeholder="Title"
            type="text"
            className="flex w-full text-emerald-900 opacity-100  pl-3 rounded h-10 border-[2px] border-black"
          />
          <small className="text-red-600 w-full font-semibold text-sm">
            {errTmsg ? errTmsg : ""}
          </small>
        </div>

      


        <div className="flex flex-col items-center px-4">
          <label
            htmlFor="category"
            className="w-full font-display pb-[2px] pl-1"
          >
            {" "}
            Add category
          </label>
          <input
            ref={categoryRef}
            placeholder="Category"
            type="text"
            className="flex w-full text-emerald-900 opacity-100  pl-3 rounded h-10 border-[2px] border-black"
          />
          <small className="text-red-600 w-full font-semibold text-sm">
            {errmsg ? errmsg : ""}
          </small>
        </div>
        <div className="flex flex-col items-center px-4">
          <label
            htmlFor="category"
            className="w-full font-display pb-[2px] pl-1"
          >
            Add image
          </label>
          <input
            ref={imageRef}
            placeholder="image"
            type="file"
            className="flex w-full text-emerald-900 opacity-100  pl-3 rounded h-10 border-[2px] border-black"
          />
          <small className="text-red-600 w-full font-semibold text-sm">
            {errImsg ? errImsg : ""}
          </small>
        </div>
        <div className="flex justify-end pt-4 pb-4">
          <button onClick={Previes} className="border-[3px] rounded mr-3 h-9 px-2 border-emerald-700">
            Previes..
          </button>
          <button
            onClick={Submit}
            className="border-[3px] rounded mr-4 h-9 px-2 border-blue-400"
          >
            New
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddblogModal;
