"use client";
import React, { useEffect, useState } from "react";
import Header from "../past/Header";
import Footer from "../past/Footer";

import { usePathname } from "next/navigation";
import CartBox from "../past/CartBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteToast } from "../../../redux/slices/toast";

const MainLayout = ({ children }) => {
  const pathname = usePathname();
  const flag = pathname === "/register" || pathname === "/login" ? false : true;
  const cart = useSelector((state) => state.cart);
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(true);
  useEffect(() => {
    if (!toast.hide) {
      setHide(false);
      setTimeout(() => setHide(true), 1300);
      setTimeout(() => dispatch(deleteToast()), 1500);
    }
  }, [dispatch, toast]);
  return (
    <>
      <div
        className={
          hide
            ? "text-nowrap border-warning text-warning bg-red-200 fixed z-[100] top-2 left-full ease-in-out  transition-all duration-300 border p-2 py-1 rounded-md "
            : "text-nowrap -translate-x-[calc(100%+0.5rem)] border-warning text-warning bg-red-200 fixed z-[100] top-2 left-full ease-in-out  transition-all duration-300 border p-2 py-1 rounded-md "
        }
      >
        {toast.status}
      </div>
      <>
        {flag ? (
          <div
            className={
              cart.box_state === false
                ? `relative group/cartbox`
                : `relative group/cartbox appear`
            }
          >
            <Header />
            {children}
            <Footer />
            <CartBox />
          </div>
        ) : (
          <>{children}</>
        )}
      </>
    </>
  );
};

export default MainLayout;
