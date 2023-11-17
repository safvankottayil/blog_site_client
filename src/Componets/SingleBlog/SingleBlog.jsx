import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../AddBlog/Title";
import Para from "../AddBlog/Para";
import Image from "../AddBlog/Images";
import Video from "../AddBlog/Video";
import { UserContext } from "../../Context/Context";
function SingleBlog(props) {
   
  const [index, setIndex] = useState(0);
  let url = window.location.href;
  url = url.split("/")[4];
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("blog"));
  const [blog, setblog] = useState([]);
  useEffect(() => {
    if (data[0]) {
      data.forEach((item, i) => {
        let title = item.title.split(" ");
        let name = "";
        title.forEach((word, i) => {
          if (i == 0) {
          } else {
            name += "-";
          }
          name += word.trim();
        });
        if (name == url) {
          setIndex(i);
        }
      });

      setblog(data);
    } else {
      //   navigate("/blog");
    }
  }, []);
  console.log(blog, "0--0");
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-1 "></div>
      <div className="col-span-7 pl-32 pt-12">
        <div className="flex justify-center border-b-[1px] mx-3 border-gray-300 w-full ">
          <p className="text-3xl font-black pt-4 pb-5 ">{data[index].title}</p>
        </div>
        {blog[index]?.description?.map((item, i) => {
          console.log(item, "000");
          if (item.type == "title") {
            return (
              <Title key={item.deatials.text} value={item.deatials.text} />
            );
          } else if (item.type == "paragraph") {
            return <Para value={item.deatials.text} key={item.deatials.text} />;
          } else if (item.type == "image") {
            return <Image IMG={item.deatials.text} key={i} />;
          } else if (item.type == "video") {
            return <Video url={item.deatials.text} key={i} />;
          }
        })}
      </div>
      <div className="col-span-3 pt-10 px-5  flex flex-col">
        <p className="capitalize   pl-8 underline font-semibold text-2xl">related Blogs</p>
        { 
        blog.map((item, i) => {

          if (i == index) {
          } else {
            return (
              <div className="py-2 text-blue-600 pl-10">
                <h1 onClick={()=>{
                    let title = item.title.split(" ");
                    let name = "";
                    title.forEach((word, i) => {
                      if (i == 0) {
                      } else {
                        name += "-";
                      }
                      name += word.trim();
                      navigate('/blog/'+name)
                      
                    });
                    setIndex(i)
                }} className="font-semibold text-sm" > {(index<i?i:i+1)+'. '+item.title}</h1>
                <p className="text-xs h-9 overflow-hidden text-black">{item.description.map(value=>{
                    let count=0
                    if(value.type=='paragraph'&&count==0){
                        count++
                        return value.deatials.text
                    }
                })}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SingleBlog;
