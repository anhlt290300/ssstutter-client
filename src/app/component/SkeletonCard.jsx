import React from "react";

const SkeletonCard = () => {
  return (
    <div className="m-2 relative ">
      <div className="hover:opacity-80 transition-all overflow-hidden">
        <div className="  ">
          <div
            alt=""
            className="w-full h-full bg-gray-300 aspect-[4/5] object-cover relative "
          >
            <div className="w-4 h-full bg-gray-200 opacity-100 absolute top-0 left-0 animate-[moveLoadingSkeleton_1.8s_ease-in-out_infinite] transition-transform delay-1000" />
          </div>
        </div>
        <div className="py-4 text-gray-300">
          <div className="grid grid-cols-12 items-start sm:items-center justify-between relative ">
            <div className="w-4 h-full bg-gray-200 opacity-100 absolute top-0 left-0  animate-[moveLoadingSkeleton_1.5s_ease-in-out_infinite] transition-transform delay-500 z-10" />
            <h4 className="uppercase sm:truncate w-full  text-xs sm:text-lg bg-gray-300 col-span-7  ">
              abc
            </h4>
            <div className=" col-span-2 bg-white z-50 h-full"></div>
            <h4 className=" font-bold  sm:text-xl bg-gray-300 col-span-3">
              aaaa
            </h4>
          </div>
          <div className=" grid grid-cols-6 mt-1 relative transition-transform">
            <div className="w-4 h-full bg-gray-200 opacity-100 absolute top-0 left-0  animate-[moveLoadingSkeleton_1.2s_ease-in-out_infinite] transition-transform delay-500 " />
            <h5 className=" bg-gray-300 sm:text-md col-span-1">aaaaa</h5>
            <div className=" col-span-4 bg-white z-10"></div>
            <div className=" col-span-1">
              <h4 className=" font-bold bg-gray-300 ">aaaaaa</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
