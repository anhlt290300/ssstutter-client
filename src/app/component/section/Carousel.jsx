import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import Slider from "react-slick";
import Image from "next/image";

const Banner2 = [
  {
    slug: "/campaign/year-of-long",
    image: "https://dashboard.leanow.vn/upload/2-2024/1708073726889.webp",
    alt: "LONG",
  },
  {
    slug: "/c/for-him",
    image: "https://dashboard.leanow.vn/upload/2-2024/1708073905140.webp",
    alt: "M123",
  },
];
const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true, // Enable mouse dragging
  };
  return (
    <section className="max-w-full bg-slate-50 overflow-hidden">
      <div className="w-full">
        <Slider {...settings}>
          {Banner2.map((item, index) => {
            return (
              <div key={index}>
                <a href={item.slug}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full sm:aspect-[18/7] object-cover aspect-[4/5]"
                  />
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="w-full grid grid-cols-3 gap-1 sm:gap-4 p-2 bg-slate-50">
        <div>
          <a
            className="w-full h-full flex items-center justify-center px-2 gap-2 text-gray-400"
            href="/voucher"
          >
            <IoCheckmarkDoneCircle size={40} />
            <p className="text-center text-[7px] sm:text-base">
              Giảm <strong className="text-black">100k</strong>
            </p>
            <div className="text-gray-400 text-[7px] sm:text-base">
              <p>
                Nhập mã: <strong className="text-black"> HELLOT1</strong>.
              </p>
              <p>ĐH ĐẦU TIÊN TỪ 699K</p>
            </div>
          </a>
        </div>
        <div>
          <a
            className="w-full h-full border-x px-2 border-slate-400 flex items-center justify-center gap-2 text-gray-400  "
            href="/voucher"
          >
            <TbTruckDelivery size={40} />
            <div className="text-gray-400 text-[7px] sm:text-base">
              <p>
                Nhập mã: <strong className="text-black"> FSTQT1</strong>.
              </p>
              <p className="text-center text-gray-400 text-[7px] sm:text-base">
                FREESHIP toàn quốc ĐƠN 499K
              </p>
            </div>
          </a>
        </div>
        <div>
          <a
            className="w-full h-full flex items-center justify-center px-2 gap-2 text-gray-400"
            href="/voucher"
          >
            <LiaTruckLoadingSolid size={40} />
            <p className="text-center text-[7px] sm:text-base">
              ĐỔI HÀNG trong vòng 30 NGÀY
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
