import React, { Suspense, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { GET } from "../../Services/userControll";
import { FaRegStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Postfallback from "./Postfallback";
const  Posts =React.lazy(()=>import("./Posts"))
function Blog() {
  const [blogs, setblogs] = useState([]);
  const navigete = useNavigate();
  const [pages, setpages] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);

  console.log(blogs, "jhbj");
  return (
    <div className="grid grid-cols-12 bg-slate-200 p-2 dark:bg-gray-900 w-full">
      <Sidebar />
      <div className=" dark:bg-gray-950 col-span-10  flex-col bg-white flex felx ">
        <div className="h-12 w-full border-b-4 flex items-center  justify-between">
          <div></div>
          <div>
            <button
              onClick={() => navigete("/addblog")}
              className="border-2 rounded bg-emerald-300 mr-2 px-2"
            >
              Add Blog
            </button>
          </div>
        </div>
        <div className="grid pl-5 pt-5 grid-cols-3 gap-3 pr-3">
          <Suspense fallback={<Postfallback />}>
            <Posts
              currentpage={currentpage}
              setblogs={setblogs}
              setpages={setpages}
              blogs={blogs}
            />
          </Suspense>
        </div>
        <div className="w-full h-14 border-t-4 border-b flex justify-center border-slate-300">
          <div className="h-full flex items-center ">
            {pages == 0 ? (
              ""
            ) : (
              <MdNavigateNext
                onClick={() => setcurrentpage(currentpage - 1)}
                className="h-10 rounded border-2 rotate-180 w-12"
              />
            )}

            <div className="h-10 min-w-[48px] rounded border-2 mx-1 flex justify-center items-center text-2xl font-display">
              {currentpage}
            </div>
            {pages == currentpage - 1 ? (
              ""
            ) : (
              <MdNavigateNext
                onClick={() => setcurrentpage(currentpage + 1)}
                className="h-10 rounded border-2 w-12"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
