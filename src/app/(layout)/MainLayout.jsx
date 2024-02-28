"use client";
import React from "react";
import Header from "../past/Header";
import Footer from "../past/Footer";

import { usePathname } from "next/navigation";

const MainLayout = ({ children }) => {
  const pathname = usePathname();
  const flag = pathname === "/register" || pathname === "/login" ? false : true;

  return (
    <>
      {flag ? <Header /> : ""}
      {children}
      {flag ? <Footer /> : ""}
    </>
  );
};

export default MainLayout;
