"use client";
import React from "react";
import Carousel from "./component/section/Carousel";
import Recommend from "./component/section/Recommend.jsx";
import Promotion from "./component/section/Promotion.jsx";
import BestSeller from "./component/section/BestSeller.jsx";
import Banner from "./component/section/Banner.jsx";
import StylePick from "./component/section/StylePick.jsx";

const HomePage = () => {
  return (
    <div className="mt-[70px] sm:mt-[80px] w-full overflow-y-auto">
      <Carousel />
      <Recommend />
      <Promotion />
      <BestSeller />
      <Banner />
      <StylePick />
    </div>
  );
};

export default HomePage;
