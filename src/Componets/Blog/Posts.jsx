import React, { useContext, useEffect } from "react";
import { FaRegStar } from "react-icons/fa6";
import { GET } from "../../Services/userControll";
import Postfallback from "./Postfallback";
import { UserContext } from "../../Context/Context";
import { useNavigate, useSearchParams } from "react-router-dom";

function Posts({ currentpage, setblogs, setpages, blogs }) {
 
  const { SetBlog } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    GET("/blogs", currentpage).then((res) => {
      console.log(res);
      if (res.status) {
        setblogs(res.blogs);
        setpages(res.pages);
      }
    });
  }, [currentpage]);
  function OpenSingleBlog(obj,index) {
    SetBlog(obj);
    let title = obj[index].title.split(" ");
    console.log(title);
    let name = "";
    title.forEach((word, i) => {
      if (i == 0) {
      } else {
        name += "-";
      }
      name += word.trim();
    });
      navigate('/blog/'+name)
  }
  return (
    <>
      {blogs.map((item,i) => {
        return (
          <div
            onClick={() => OpenSingleBlog(blogs,i)}
            className="flex col-span-1 h-fit "
          >
            <div className="flex flex-col w-full h-full rounded-sm ">
              <img src={item?.image} className="h-60 w-full" alt="" />
              <div className="overflow-hidden">
                <p className="px-1 pt-1 font-semibold">{item.title}</p>
                <p className="felx overflow-hidden pt-1 h-14 leading-4 text-sm">
                  {item.description.map((value) => {
                    let count = 0;
                    if (value.type == "paragraph" && count == 0) {
                      count++;
                      return value.deatials.text;
                    }
                  })}
                </p>
                <div className="flex justify-between">
                  <div className="flex py-1 px-1">
                    <FaRegStar className="text-yellow-600" />
                    <FaRegStar className="text-yellow-600" />
                    <FaRegStar className="text-yellow-600" />
                    <FaRegStar className="text-yellow-600" />
                    <FaRegStar className="text-yellow-600" />
                  </div>
                  <p className="capitalize pr-2 text-blue-500">more...</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {blogs[0] ? "" : <Postfallback />}
    </>
  );
}

export default React.memo(Posts)
