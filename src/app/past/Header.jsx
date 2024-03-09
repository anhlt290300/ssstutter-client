"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import { FiUser } from "react-icons/fi";
import { GoSignIn } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleBox } from "../../../redux/slices/cart";

const Banner = [
  {
    slug: "/campaign/tet-lanh",
    title: "Nhập: TETLANH giảm 10% trải nghiệm BST mới.",
  },
  {
    slug: "/c/for-him",
    title: " ✈️ FREESHIP cho hóa đơn từ 499.000 VNĐ.",
  },
  {
    slug: "/campaign/tet-lanh",
    title: `"TẾT LÀNH" IS NOW AVAILABLE! 🌱`,
  },
];

const Nav = [
  {
    slug: "/about",
    title: "ABOUT SSS.",
  },
  {
    slug: "/c/for-him",
    title: "SẢN PHẨM",
  },
  {
    slug: "/voucher",
    title: "🏷️ VOUCHER",
  },
  {
    slug: "/campaign/year-of-long",
    title: "🐉 YEAR OF LONG",
  },
  {
    slug: "/campaign/tet-lanh",
    title: `⭐ NEW `,
  },
];

const Header = () => {
  const session = useSelector((state) => state.session);
  //console.log(session);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getCartLength = () => {
    let sum = 0;
    cart.items.forEach((element) => {
      sum += element.quantity;
    });
    return sum;
  };
  return (
    <header className="w-full group box-content  fixed top-0 left-0 z-40  drop-shadow-sm sm:drop-shadow-none bg-secondary border-b">
      <div className="bg-black w-full text-white text-center">
        <Slider {...settings}>
          {Banner.map((item, index) => {
            return (
              <div
                className="sm:flex-row flex-col flex justify-center items-center gap-1 sm:gap-4 w-full p-2 text-[10px] sm:text-sm text-center "
                key={index}
              >
                <a href={item.slug}>
                  <p className="tracking-wider">{item.title}</p>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-5 h-[70px] sm:h-[80px] sm:p-0 py-2 px-4  ">
        <div className="sm:pl-10 flex flex-row justify-start items-center gap-4 col-span-1 lg:hidden">
          <GiHamburgerMenu size={30} />
        </div>

        <div className="grid place-content-center px-2 col-span-1 ">
          <a href="/">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold group-hover:!text-black">
              SSSTUTTER!
            </h1>
          </a>
        </div>
        <div className="col-span-2 px-2 lg:flex hidden flex-row justify-start sm:justify-center items-center gap-16 sm:gap-8 uppercase">
          {Nav.map((item, index) => {
            return (
              <div
                className="truncate  text-lg  relative  text-black group-hover:text-black"
                key={index}
              >
                <a href={item.slug}>
                  <p>{item.title}</p>
                </a>
              </div>
            );
          })}
        </div>
        <div className="col-span-1 px-1 sm:pr-10 flex flex-row justify-end items-center gap-4 sm:gap-10">
          <div className="cursor-pointer">
            <MdOutlineSearch size={30} />
          </div>
          {cart.status === "loading" ? (
            <div className="">
              <AiOutlineLoading3Quarters size={30} className=" animate-spin" />
            </div>
          ) : (
            <div
              onClick={() => dispatch(toggleBox())}
              className="relative cursor-pointer"
            >
              <MdOutlineShoppingBag size={30} />
              {cart.items.length > 0 && (
                <p className="absolute px-1 -bottom-1 -right-1 text-[8px] text-white rounded-full bg-warning">
                  {getCartLength()}
                </p>
              )}
            </div>
          )}
          {session.status === "loading" ? (
            <div className="">
              <AiOutlineLoading3Quarters size={30} className=" animate-spin" />
            </div>
          ) : session.status === "authenticated" ? (
            <div className="cursor-pointer relative group/user">
              <a href="/user">
                <FiUser size={30} />
              </a>
              <div className=" hidden absolute top-full right-full translate-x-1/2  p-2 text-left rounded group-hover/user:block ">
                <div className="grid  text-white/60 bg-black/80 rounded pb-1">
                  <a
                    href="/user/profile"
                    className="w-20 py-1 px-2 hover:text-white group/a"
                  >
                    <p className="w-full relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white/60 after:transition-all after:duration-300 after:ease-in-out after:group-hover/a:w-full after:group-hover/a:bg-white">
                      Profile
                    </p>
                  </a>
                  <a
                    href="/user/order"
                    className="w-20 py-1 px-2 hover:text-white group/a"
                  >
                    <p className="w-full relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white/60 after:transition-all after:duration-300 after:ease-in-out after:group-hover/a:w-full after:group-hover/a:bg-white">
                      Order
                    </p>
                  </a>
                  <div
                    onClick={() => signOut()}
                    className="w-20 py-1 px-2 hover:text-white group/a"
                  >
                    <p className="w-full relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white/60 after:transition-all after:duration-300 after:ease-in-out after:group-hover/a:w-full after:group-hover/a:bg-white">
                      LogOut
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="cursor-pointer">
              <a href="/login">
                <GoSignIn size={30} />
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
