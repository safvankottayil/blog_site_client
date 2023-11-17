import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {validation} from './validation'
import ThemeSwicher from "../ThemeSwicher";
import {POST} from '../../Services/userControll'
 function Signup() {
  const emailRef = useRef(null),
    passwordRef = useRef(null);
  const [Err, setErr] = useState([])
  const [ErrMsg, setErrMsg] = useState([{},{}]);
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
 async function handleSubmit(e){
    e.preventDefault()
   const check= validation([1,2],{email:emailRef.current.value,password:passwordRef.current.value},setErrMsg)
    if(check){
    const res=await POST('/signup',{email:emailRef.current.value,password:passwordRef.current.value})
    console.log(res);
    if(res.status){
    }else{
      if(res.type=='email'){
        console.log(ErrMsg);
        setErrMsg([{msg:"email already exist",type:'err'},{}])
      }
    }
    }
    }
  return (
    <div className="flex w-full min-h-screen text-sm flex-col justify-center items-center">
      <div className="absolute right-5 top-5">
        <ThemeSwicher />
      </div>
      <form onSubmit={handleSubmit} className="w-96 min-h-96 flex flex-col items-center border-gray-500 border-[1px]  mb-3">
        <div className="pt-5">
          <h1 className="font-black capitalize  font-display py-7 text-2xl">
            jungle book
          </h1>
        </div>
        <div className="flex w-full justify-center items-center pt-2">
          <div className="w-4/5 h-11 rounded flex border-[1px] items-center justify-center dark:border-white border-black">
            <FcGoogle className="h-6 w-6 mr-2 mt-[1px]" />{" "}
            <span className="font-medium">Sign up with Google</span>
          </div>
        </div>
        {/* ///////////////////// */}
        <div className="flex items-center pt-2">
          <span className="h-[1.5px] bg-gray-600 w-20"></span>
          <span className=" font-display px-4"> or</span>
          <span className="h-[1.5px] bg-gray-600 w-20"></span>
        </div>
        {/* 
      /////////////////////////////// */}

        <div className="w-full pt-3 flex flex-col relative  items-center ">
          <input
          onChange={()=>validation([1,0],{email:emailRef.current.value},setErrMsg)}
            ref={emailRef}
            placeholder="Email"
            type="text"
            className={`w-4/5 pl-3 h-11 font-display rounded border-black focus:outline-none  ${ErrMsg[0]?.type=='err'?'border-red-600 border-2 ':'border-[1px]'}`}
          />
          <div className="absolute top-[54px] flex w-4/5 ">
          
            <i
              className={`${
                ErrMsg[0]?.type == "err"
                  ? "text-red-500 font-semibold flex items-center text-start "
                  : ""
              }`}
            >
              {ErrMsg[0]?.type == "err" ? ErrMsg[0].msg : ""}
            </i>
          </div>
        </div>
        <div className="w-full pt-5 flex relative justify-center">
          <input
          onChange={()=>validation([0,2],{password:passwordRef.current.value},setErrMsg)}
            ref={passwordRef}
            placeholder="password"
            type={eye ? "text" : "password"}
            className={`pl-3 font-display w-4/5 dark:text-white h-11 rounded focus:outline-none border-black border ${ErrMsg[1]?.type == "err"?'border-red-600 border-2 ':'border-[1px]  '}`}
          />
          {eye ? (
            <BsEyeSlashFill
              onClick={() => setEye(!eye)}
              className="absolute  rounded w-4 h-4 z-10 right-12 top-9"
            />
          ) : (
            <BsEyeFill
              onClick={() => setEye(!eye)}
              className="absolute w-4 h-4 z-10 right-12 top-9"
            />
          )}
          <div className="absolute top-[62px] flex w-4/5 ">
            <i
              className={`${
                ErrMsg[1]?.type == "err"
                  ? "text-red-500 font-semibold flex items-center text-start "
                  : ""
              }`}
            >
              {ErrMsg[1]?.type == "err" ? ErrMsg[1].msg : ""}
            </i>
          </div>
        </div>
        <div className="w-full flex justify-center pt-5 pb-8">
          <button  className="text-white h-10  font-extrabold bg-sky-400 w-4/5 rounded-md">
            Sign up
          </button>
        </div>
      </form>
      <div className="border-[1px] flex items-center justify-center border-gray-500 w-96 h-20">
        <p className="">
          Do you have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
