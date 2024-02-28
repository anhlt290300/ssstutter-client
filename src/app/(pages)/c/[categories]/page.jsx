"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { VscListFlat } from "react-icons/vsc";
import { FiX } from "react-icons/fi";
import ListItemByCategory from "../../../component/listItem/ListItemByCategory";
import { useRouter, usePathname } from "next/navigation";
raf
const categories = [
  { slug: "so-mi-ao-kieu", title: "SƠ MI & ÁO KIỂU" },
  { slug: "ao-thun", title: "ÁO THUN" },
  { slug: "quan", title: "QUẦN" },
  { slug: "len-det", title: "LEN DỆT" },
  { slug: "phu-kien", title: "PHỤ KIỆN" },
  { slug: "ao-blazer-ao-khoac", title: "ÁO BLAZER & ÁO KHOÁC" },
  { slug: "quan-bo", title: "QUẦN BÒ" },
  { slug: "quan-short", title: "QUẦN SHORT" },
  { slug: "giay", title: "GIÀY" },
  { slug: "tui-vi", title: "TÚI & VÍ" },
  { slug: "hoodies-sweatshirt", title: "hoodies & sweatshirt" },
  ,
];

const Page = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const listRef = useRef(null);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(true);
  const router = useRouter();
  const currentPathname = usePathname();

  const handleNavigation = (slug) => {
    //console.log(currentPathname);
    const newPathname = `${currentPathname}/${slug}`;

    router.push(newPathname);
  };

  useEffect(() => {
    let screen = window.innerHeight;
    let scrollTop = document.documentElement.scrollTop;
    let scrollheight = listRef.current.clientHeight;

    window.addEventListener("scroll", () => {
      screen = window.innerHeight;
      scrollTop = document.documentElement.scrollTop;
      scrollheight = listRef.current.clientHeight;
      // console.log(screen);
      // console.log(scrollTop);
      // console.log(scrollheight);
      if (screen + scrollTop + 1 >= scrollheight) {
        setTimeout(() => setUpdate(true), 1000);
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  return (
    <div
      //onScroll={() => handleScroll()}
      className={
        openCategories
          ? " group/categories open py-4 sm:mt-[130px] mt-[70px] "
          : "group/categories py-4 sm:mt-[130px] mt-[70px]"
      }
    >
      <div className="flex items-center px-20">
        <h1 className="uppercase text-xl  font-bold ">For Him</h1>
      </div>
      <div className="grid grid-cols-2 border items-center p-2 sm:px-20 sm:py-10 sm:border-none">
        <div
          onClick={() => setOpenCategories((openCategories) => !openCategories)}
          className="flex items-center justify-between sm:justify-start gap-4 border-r sm:border-none px-2 sm:px-0 cursor-pointer"
        >
          <h2 className="capitalize">danh mục</h2>
          <IoIosArrowDown
            size={20}
            className=" transition-all ease-in-out duration-300 group-[.open]/categories:-rotate-180"
          />
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4 px-2 sm:px-0 cursor-pointer ">
          <h4 className="capitalize">refine by</h4>
          <VscListFlat size={20} />
        </div>
      </div>
      <div>
        <div className="absolute z-50 w-0 h-0 sm:hidden bg-primary-100 sm:bg-none top-0 left-0 transition backdrop-blur-[1]" />
        <div className="translate-x-0 sm:h-0 group-[.open]/categories:h-[20vh] absolute sm:static w-3/4 sm:w-full h-screen sm:overflow-auto z-50 top-0 left-0 flex justify-end ease-in-out  transition-all duration-300 ">
          <div className=" bg-secondary h-full w-full">
            <div className="flex justify-between items-center p-4 border-b sm:hidden bg-primary-500 text-secondary">
              <h1 className="text-2xl">For Him</h1>
              <FiX size={20} />
            </div>
            <ul className="py-2 overflow-auto sm:flex sm:flex-wrap sm:px-20">
              {categories.map((item, index) => {
                return (
                  <li
                    onClick={() => handleNavigation(item.slug)}
                    className="sm:w-1/4"
                    key={index}
                  >
                    <h3 className="block px-8 py-2 cursor-pointer hover:underline uppercase">
                      {item.title}
                    </h3>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div ref={(e) => (listRef.current = e)}>
        <ListItemByCategory update={update} setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default Page;
