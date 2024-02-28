"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import ApolloProviderLayout from "@/app/serverpage/apollo/ApolloProviderLayout";
import Product from "./Product";
import Recommend from "./Recommend";

const page = () => {
  return (
    <ApolloProviderLayout>
      <div className="mt-[100px]">
        <Product />
        <Recommend />
      </div>
    </ApolloProviderLayout>
  );
};

export default page;
