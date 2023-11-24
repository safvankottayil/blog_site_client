import React, { useRef, useState } from "react";
// import  {} from 'react-google-fonts'
import { FcGoogle } from "react-icons/fc";
import { BsEyeFill,BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ThemeSwicher from "../ThemeSwicher";
import { validation } from "../Signup/validation";
import {POST} from '../../Services/userControll'
import { useContext } from "react";
import {UserContext} from '../../Context/Context'
function Login() {
  const {token,login,logout}=useContext(UserContext)
  const navigate=useNavigate()
  const [eye, setEye] = useState(false);
  const emailRef = useRef(null),
  passwordRef = useRef(null);
const [ErrMsg, setErrMsg] = useState([{},{}]);
async function handleSubmit(e){
  e.preventDefault()
 const check= validation([1,2],{email:emailRef.current.value,password:passwordRef.current.value},setErrMsg)
 
  if(check){
const res= await POST('/login',{email:emailRef.current.value,password:passwordRef.current.value})
 if(res.status){

    login(res.token)
   navigate('/')
 }else{
  console.log(res);
  if(res.type=='email'){
    setErrMsg([{msg:'Email does not exist',type:'err'},{}])
  }else if(res.type=='password'){
    setErrMsg([{},{msg:'password does not match',type:'err'}])
  }
 }
  }
  }
  return (
    <div className="flex  w-full min-h-screen text-sm flex-col justify-center items-center">
      <div className="absolute right-5 top-5">
      <ThemeSwicher/>
      </div>
     
      <form onSubmit={handleSubmit} className="w-96 min-h-96 flex flex-col items-center border-gray-500 border-[1px]  mb-3">
        <div className="pt-5 ">
          
        <h1 className="font-black capitalize  font-display py-7 text-2xl">
            jungle book
          </h1>
        </div>
        <div className="w-full  relative flex justify-center">
          <input
          onChange={()=>validation([1],{email:emailRef.current.value},setErrMsg)}
            placeholder="Email"
            type="text"
            ref={emailRef}
            className="w-4/5 pl-3 h-11 font-display rounded border-black border-[1px]"
          />
            <div className="absolute top-[61px] flex w-4/5 ">
          
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
            className="pl-3 font-display w-4/5 h-11 rounded border-black border-[1px]"
          />
          {eye ? (
            <BsEyeSlashFill onClick={()=>setEye(!eye)} className="absolute w-4 h-4 z-10 right-12 top-9" />
          ) : (
            <BsEyeFill onClick={()=>setEye(!eye)} className="absolute w-4 h-4 z-10 right-12 top-9" />
          )}
           <div className="absolute top-[61px] flex w-4/5 ">
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
        <div className="w-full flex justify-center pt-5">
          <button className="text-white h-10  font-extrabold bg-sky-400 w-4/5 rounded-md">
            log in
          </button>
        </div>
        <div className="flex items-center pt-4">
          <span className="h-[1.5px] bg-gray-600 w-20"></span>
          <span className=" font-display px-4"> or</span>
          <span className="h-[1.5px] bg-gray-600 w-20"></span>
        </div>
        <div className="flex items-center pt-2">
          <FcGoogle className="h-6 w-6 mr-2 mt-[1px]" />{" "}
          <span className="font-medium">Log in with Google</span>
        </div>
        <div className="py-4">
          <span className="text-blue-500 font-display text-sm">
            Forgot password?
          </span>
        </div>
      </form>
      <div className="border-[1px] flex items-center justify-center border-gray-500 w-96 h-20">
        <p className="">
          Don't have an account?{" "}
          <span onClick={()=>navigate('/signup')} className="text-blue-600 font-semibold">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
