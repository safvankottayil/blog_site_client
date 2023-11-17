import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../AddBlog/Title";
import Para from "../AddBlog/Para";
import Image from "../AddBlog/Images";
import Video from "../AddBlog/Video";
import { UserContext } from "../../Context/Context";
function SingleBlog() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("blog"));
  const [blog, setblog] = useState({});
  useEffect(() => {
    if (data._id) {
      setblog(data);
    } else {
      navigate("/blog");
    }
  });

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"></div>
      <div className="col-span-7 pt-12">
        <div className="flex justify-center border-b-[1px] mx-3 border-gray-300 w-full ">
          <p className="text-3xl font-black pt-4 pb-5 ">{data.title}</p>
        </div>
        {blog?.description?.map((item, i) => {
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
      <div className="col-span-2"></div>
    </div>
  );
}

export default SingleBlog;
