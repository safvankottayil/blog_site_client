import React, { useEffect, useState, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { MdTitle } from "react-icons/md";
import { PiSubtitlesDuotone } from "react-icons/pi";
import { BsImages, BsLink45Deg } from "react-icons/bs";
import { BiSolidVideoRecording } from "react-icons/bi";
import Title from "./Title";
import { GiPlayButton } from "react-icons/gi";
import Para from "./Para";
import LInk from "./LInk";
import Images from './Images'
import { GET, PATCH } from "../../Services/userControll";
import AddblogModal from "./AddblogModal";
import Video from "./Video";

function AddBlog() {
  const navigate = useNavigate();
  const scrollref=useRef(null),videoRef=useRef(null)
  const [searchParams, setSearchparams] = useSearchParams();
  console.log(searchParams.get("id"));
  const [blogs,setblogs]=useState([])
  const [blogId, setBlogId] = useState(null);
  const [data, setData] = useState([]);
  const [blogtitle,setBlogTitle]=useState('')
  const inputRef = useRef(null),imgRef=useRef(null)
  const [index, setIndex] = useState(-1);
  const [selectErr,setselect]=useState(false)
  const [count,setcount]=useState(0)
  useEffect(() => {
    if (searchParams.get("id")) {
      setBlogId(searchParams.get("id"));
    }
  }, [count]);
  console.log(blogs);
  useEffect(()=>{
     scrollref.current.scrollTop=scrollref.current.scrollHeight
  },[data])
  useEffect(() => {
    if (blogId) {
      GET("addblogs", blogId).then((res) => {
        if (res.status) {
          setblogs(res.blogs)
          setIndex(res.data.length-1)
          setBlogTitle(res.title)
          console.log(res.title,'tit');
          setData(
            res.data.map((value) => {
              return {
                type: value.type,
                text: value?.deatials?.text,
                save: true,
              };
            })
          );
        }
      });
    }
  }, [blogId]);
  function InputHandle() {
    if(data.length==0){
      setselect(true)
    }
    setData(
      data.map((value, ind) => {
        if (ind == index&&value.save==false) {
          return {
            type:
              value.type == "title"
                ? "title"
                : value.type == "paragraph"
                ? "paragraph"
                : "",
            text: inputRef.current.value,
            save: false,
          };
        } else {
          if(ind == index&&value.save){
            setselect(true)
          }
          return value;

        }
      })
    );

    console.log(data);
  }
  console.log(data);
  console.log(index,'--');
  async function submitCheck() {
    setselect(false)
    inputRef.current.value=''
    const Index = index;
    setIndex(index + 1);
    if (data[Index]?.save == "undefined" || data[Index]?.save == false) {
      if (data[Index]?.save == false) {
        if(data[Index]?.type=='image'){
          const res = await PATCH("/addblog", {
            type: data[Index].type,
            image: data[Index].text,
            id: blogId,
          });
      }else if(data[Index].type=='video'){
        const res = await PATCH("/addblog", {
          type: data[Index].type,
          image: data[Index].text,
          id: blogId,
        });
      } 
        else{
          const res = await PATCH("/addblog", {
            type: data[Index].type,
            text: data[Index].text,
            id: blogId,
          });
        }
       
       
      }
    } else {
      
    }
  }
  return (
    <div className=" w-full grid grid-cols-12">
      {blogId ? "" : <AddblogModal update={setcount} />}
      <input onChange={(e)=>{
        setData(data.map((value,ind)=>{
          if(index==ind){
              return {type:'image',text:e.target.files[0],save:false}
          }else{
            return value
          }
        }))
      }} ref={imgRef} type="file" className="hidden" />
      <input ref={videoRef} onChange={(e)=>{
 setData(data.map((value,ind)=>{
  if(index==ind){
      return {type:'video',text:e.target.files[0],save:false}
  }else{
    return value
  }
}))
      }} type="file" className="hidden" />
      <div className="flex col-span-1 flex-col  h-screen bg-slate-50 items-end prdd-5 pt-3 pr-5  border-r-[1px] border-black dark:border-gray-400">
        <div className="border-2 rounded-md p-2">
        <BiArrowBack
          onClick={() =>{navigate('/')}}
          className="flex w-10 h-10  border-2 rounded-md border-black "
        />
        </div>
        
        <div className={`flex flex-col ${selectErr?"border-red-400":''} border-2 rounded-md p-2 mt-10 space-y-3`}>
          <MdTitle
            onClick={() => {
              setData([...data, { type: "title", text: "Title", save: false }]),
                submitCheck();
            }}
            className=" flex w-10 h-10 border-2 p-1 rounded-md border-yellow-400 outline-2 "
          />
          <PiSubtitlesDuotone
            onClick={() => {
              setData([
                ...data,
                { type: "paragraph", text: "paragraph", save: false },
              ]),submitCheck()
            }}
            className="flex w-10 h-10 p-1 border-2 rounded-md border-black "
          />
          <BsImages
            onClick={() => {imgRef.current.click()
              setData([...data, { type: "image", text: "", save: false }])
              submitCheck()
            }}
            className="flex w-10 h-10 border-2 p-1 rounded-md border-black"
          />
          <BsLink45Deg
            onClick={() => {
              setData([
                ...data,
                {
                  type: "link",
                  text: "enter",
                  url: "#",
                  urltext: "text",
                  save: false,
                },
              ]);
            }}
            className="flex w-10 h-10 border-2 p-1 rounded-md border-black"
          />
          <BiSolidVideoRecording 
            onClick={() => {videoRef.current.click()
              setData([...data, { type: "video", text: "", save: false }])
              submitCheck()
            }} className="flex w-10 h-10 border-2 p-1 rounded-md border-black" />
        </div>
      </div>
      <div className="col-span-9 flex flex-col justify-between relative h-screen  flex-grow">
        <div ref={scrollref} className="flex  bg-gray-200 m-3 pl-36 pt-10  overflow-y-auto rounded-lg flex-grow">
          <div className="w-11/12">
            {/* <Title
              value={
                "30 Top Travel Photography Blogs for 2023 30 Top Travel Photography Blogs for 2023 30 Top Travel Photography Blogs for 2023 30 Top Travel Photography Blogs for 2023"
              }
            />
            <Para
              value={
                "As a passionate traveller, photographer and blogger, I’m always looking for inspiration. I love looking at travel photography blogs to learn more about new places, see what other people are doing, and pick up tips and ideas for my own work."
              }
            />
            <Para
              value={
                "As a passionate traveller, photographer and blogger, I’m always looking for inspiration. I love looking at travel photography blogs to learn more about new places, see what other people are doing, and pick up tips and ideas for my own work.s a passionate traveller, photographer and blogger, I’m always looking for inspiration. I love looking at travel photography blogs to learn more about new places, see what other people are doing, and pick up tips and ideas for my own work."
              }
            />
            <LInk
              url={"/login"}
              text={"fuck days comming soon"}
              colortext={"redirect login page"}
            /> */}
            <div className="flex justify-center border-b-[1px] border-gray-300 w-full ">
              <p className="text-3xl font-black pt-4 pb-5 ">{blogtitle}</p>
              </div>
            {data.map((value) => {
              if (value.type === "title") {
                return <Title value={value.text} />;
              } else if (value.type === "paragraph") {
                return <Para value={value.text} />;
              }else if(value.type=='image'){
                if(value.text==''||value.save==true){
                  return <Images IMG={value.text} />
                }else{
                  return <Images IMG={window.URL.createObjectURL(value.text)} />
                }
              }else if(value.type=='video'){
                if(value.text==''||value.save==true){
                  return <Video url={value.text} />
                }else{
                  return <Video url={window.URL.createObjectURL(value.text)} />
                }
                }
               
              }
            )}
          </div>
          <div className="w-1/12 border-l-[1px] border-gray-300"></div>
        </div>
        <div className="flex h-20 ">
          <div className="flex bg-slate-400 w-full items-center mx-3 mb-3 rounded-md">
            <textarea
              onChange={InputHandle}
              ref={inputRef}
              className="m-2 rounded-md p-1 h-14 flex flex-grow"
            ></textarea>
            {data[data.length-1]?.save==false?
            <GiPlayButton onClick={()=>{setData([...data,{save:true}]),submitCheck()}} className="w-14 h-14 rounded-md p-2 border-2 mx-2" />:''}
          </div>
        </div>
      </div>

      {/* //////////////////////////////////////////////// */}

      <div className="col-span-2 flex   min-h-screen">
        <div class="border  shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-20 bg-slate-300 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-20 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-20 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div class="h-20 bg-slate-200 rounded"></div>
                <div class="grid  grid-cols-3 gap-4">
                  <div class="h-20 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-20  bg-slate-300 rounded col-span-1"></div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="h-20 bg-slate-300 rounded col-span-1"></div>
                  <div class="h-20 bg-slate-200 rounded col-span-3"></div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="h-20 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-20 bg-slate-300 rounded col-span-2"></div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="h-20 bg-slate-300 rounded col-span-1"></div>
                  <div class="h-20 bg-slate-200 rounded col-span-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
