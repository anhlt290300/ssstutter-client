"use client";
import React from "react";
import ApolloProviderLayout from "@/app/serverpage/apollo/ApolloProviderLayout";
import Product from "./Product";
import Recommend from "./Recommend";

const page = () => {
  return (
    <div className="mt-[100px]">
      <Product />
      <Recommend />
    </div>
  );
};

export default page;
