import React, { useEffect, useRef, useState } from "react";
const RATING = [1, 2, 3, 4, 5];
import { IoStar } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GET, POST } from "../../Services/userControll";
function BlogReview({ id }) {
  useEffect(() => {
    GET("/blog/israted/" + id).then((res) => {
      setShowrating(res.status);
    });
  }, []);
  
  const [showrating, setShowrating] = useState(true);
  const [rating, setrating] = useState([0, 0, 0, 0, 0]);
  const token = localStorage.getItem("token");
  const [rate, setRate] = useState(0);
  const [Err, setErr] = useState(false);
console.log(showrating);
  function submit() {
    console.log(123);
    if (rate == 0) {
      setErr(true);
    } else {
      POST("/blog/addrating/" + id + "/" + rate, {})
        .then((res) => {
          if (res.status) {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="flex flex-col w-full sticky top-24 ml-9 pl-3 font-display  ">
        <div className="border-2   flex flex-col w-full">
          <p className="pl-3">Raitings</p>
          <div className="flex ">
            <div className="w-2/5 flex flex-col">
              <div className="flex justify-center pt-4 ">
                <h1 className="text-5xl flex  justify-center">3.5</h1>
              </div>
              <div className="flex justify-center items-center pt-3">
                {" "}
                <p className="">
                  <IoStar className="h-5 w-5 mr-2 text-emerald-500" />
                </p>
                <FaUser /> {10}
              </div>
            </div>
            <div className="flex w-3/5 flex-col-reverse">
              {rating.map((item, i) => {
                return (
                  <>
                    <div className="flex items-center">
                      <p className="flex font-display">{i + 1}</p>
                      <p className="h-3 rounded-md mx-2 w-full overflow-hidden bg-slate-200 ">
                        <p
                          style={{ width: `${item}%` }}
                          className={`h-full flex  transition-all duration-500 bg-emerald-500 rounded-md `}
                        ></p>
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {showrating == false ? (
          token ? (
            <div className="flex flex-col border-2 mt-4 pb-2">
              <p className="capitalize pl-2 pt-1">add your rating</p>
              <div className="flex pl-2 justify-between border-2 mx-2 rounded-md py-1">
                <div className="flex">
                  {RATING.map((value, I) => {
                    return (
                      <IoStar
                        onClick={() => setRate(I + 1)}
                        className={`${
                          rate >= value ? "text-emerald-500" : "text-slate-300"
                        } w-7 mx-1  h-7`}
                      />
                    );
                  })}
                </div>
                <FaLongArrowAltRight
                  onClick={submit}
                  className="w-7 h-7 mr-3"
                />
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default BlogReview;
