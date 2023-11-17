import React from "react";
import { FaRegStar } from "react-icons/fa6";

function Postfallback() {
  const item = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {item.map(() => {
        return (
          <div className="flex col-span-1 h-96 ">
            <div className="flex animate-pulse flex-col w-full h-full rounded-sm ">
              <div className="h-60 bg-slate-300 rounded-md mb-1 w-full" alt="" />
              <div className="overflow-hidden">
                <p className="px-1 pt-1 h-4 w-full bg-slate-500 rounded-md mt-1 mb-1 font-semibold"></p>
                <p className="grid grid-cols-1 pt-1 h-14 leading-4 text-sm">
                  <p className="col-span-1 rounded-md  bg-slate-400 h-3 "></p>
                  <p className="col-span-1 rounded-md  bg-slate-400 h-3 "></p>
                  <p className="col-span-1 rounded-md  bg-slate-400 h-3 "></p>
                </p>
                <div className="flex justify-between">
                  <div className="flex py-1 px-1">
                    <FaRegStar className="" />
                    <FaRegStar className="  " />
                    <FaRegStar className="  " />
                    <FaRegStar className="  " />
                    <FaRegStar className="  " />
                  </div>
                  <p className="capitalize pr-2 h-4 rounded-md w-20 bg-slate-400"></p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Postfallback;
