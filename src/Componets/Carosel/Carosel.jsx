import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "framer-motion";

const sliderVariants = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};
const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

function Carosel({ images }) {
  console.log(images);
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const activeImageIndex = wrap(0, images.length, imageCount);
  console.log(activeImageIndex, "111");
  function swipeToImage(swipeDirection) {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  }
  useEffect(() => {
    setTimeout(() => {
      swipeToImage(1);
    }, 4000);
  }, [activeImageIndex]);

  const dragEndHandler = (dragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };
  const skipToImage = (imageId) => {
    let changeDirection;
    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, changeDirection]);
  };

  return (
    <div className="relative">
      <div className="slider relative overflow-hidden h-[90vh] w-full ">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={imageCount}
            style={{
              backgroundImage: `url(${images[activeImageIndex]?.image})`,
            }}
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
            className="h-[90vh] absolute top-0 w-full object-cover bg-no-repeat  bg-cover bg-center"
          />
        </AnimatePresence>
      </div>
      <div className="absolute flex left-24 top-16  w-2/4">
        <div className="flex items-end pr-2 ">
          <p className={` transition-all duration-50 font-black text-6xl break-words capitalize whitespace-normal w-[600px] `} alt="Musician">
            {images[activeImageIndex]?.title}
          </p>
        </div>
      </div>
      <div className="absolute flex bottom-10  right-10 h-96 w-1/2">
        {images.map((image, i) => (
          <div
            key={image.image}
            onClick={() => skipToImage(i)}
            className="flex items-end pr-2 "
          >
            <img
              className={`${
                activeImageIndex == i ? "scale-125 shadow-lg shadow-black " : ""
              } transition-all duration-500   felx h-40 rounded-md  border-black border-2 w-80 `}
              src={image.image}
              alt="Musician"
            />
            {/* <div
              className={`active-indicator ${
                image.id === activeImageIndex ? "active" : null
              }`}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carosel;
