"use client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apollo/apollo.js";
import React from "react";
import Carousel from "./component/section/Carousel";
import Suggest from "./component/section/Suggest";
import Promotion from "./component/section/Promotion.jsx";
import BestSeller from "./component/section/BestSeller.jsx";
import Banner from "./component/section/Banner.jsx";
import StylePick from "./component/section/StylePick.jsx";

const HomePage = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="mt-[70px] sm:mt-[80px] w-full overflow-y-auto">
        <Carousel />
        <Suggest />
        <Promotion />
        <BestSeller />
        <Banner />
        <StylePick />
      </div>
    </ApolloProvider>
  );
};

export default HomePage;
