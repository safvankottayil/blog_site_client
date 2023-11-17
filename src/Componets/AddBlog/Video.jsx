import React, { useState } from "react";
import ReactPlayer from "react-player";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import { CiPlay1, CiPause1 } from "react-icons/ci";

function Video({ url }) {
  const [play, setplay] = useState(true);
  const [sound, setSound] = useState(0);
  return (
    <div className="m-2 flex w-full object-cover relative flex-grow justify-center  p-3 bg-slate-300 rounded-md ">
      <ReactPlayer
        onStart={() => setplay(true)}
        onPause={() => setplay(false)}
        onEnded={() => setplay(false)}
        playing={play}
        volume={sound}
        url={url}
      ></ReactPlayer>
      <div className="flex  items-center right-3 absolute bg-black h-fit rounded-md px-2 space-x-2 py-2 ">
        {sound == 0 ? (
          <GoMute className="text-white w-7 h-7 " onClick={() => setSound(1)} />
        ) : (
          <GoUnmute
            className="text-white w-7 h-7"
            onClick={() => setSound(0)}
          />
        )}
        {play == false ? (
          <CiPlay1
            className="text-white w-7 h-7"
            onClick={() => setplay(!play)}
          />
        ) : (
          <CiPause1
            className="text-white w-7 h-7"
            onClick={() => setplay(!play)}
          />
        )}
      </div>
    </div>
  );
}

export default Video;
