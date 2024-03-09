import React from "react";

const Custom404 = () => {
  return (
    <div className="mt-[100px]">
      <div className="grid relative place-content-center w-screen h-screen bg-center bg-cover bg-[url(https://dashboard.leanow.vn/upload/3-2022/1648018206047.webp)]">
        <div className="p-4 w-3/4 flex flex-col justify-center items-center gap-10 absolute bottom-1/4 left-1/2 -translate-x-1/2 ">
          <h1 className="text-lg sm:text-3xl text-primary-100 uppercase">
            Không tìm thấy sản phẩm
          </h1>
          <a className="bg-black p-4 w-full text-white text-center" href="/">
            Trở về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
