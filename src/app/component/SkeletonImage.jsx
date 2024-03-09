import React from "react";

const SkeletonImage = () => {
  return (
    <div className="relative w-full">
      <div className="hover:opacity-80 transition-all overflow-hidden">
        <div className="  ">
          <div
            alt=""
            className="w-full h-full bg-gray-300 aspect-[4/5] object-cover relative "
          >
            <div className="w-4 h-full bg-gray-200 opacity-100 absolute top-0 left-0 animate-[moveLoadingSkeleton_1.8s_ease-in-out_infinite] transition-transform delay-1000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonImage;
