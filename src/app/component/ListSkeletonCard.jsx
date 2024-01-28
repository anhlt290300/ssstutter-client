import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkeletonCard from "./SkeletonCard";

const ListSkeletonCard = ({ slidesToShow }) => {
  let show = slidesToShow ? slidesToShow : 1;
  const sliderRef = React.createRef();

  const settings = {
    dots: false,
    speed: 1000,
    slidesToShow: show,
    slidesToScroll: 1,
    draggable: false, // Enable mouse dragging
    arrows: false,
  };
  return (
    <div className=" relative w-full">
      <Slider ref={sliderRef} {...settings} className="w-full">
        {new Array(show).fill(undefined).map((item, index) => {
          return <SkeletonCard key={index} />;
        })}
      </Slider>
    </div>
  );
};

ListSkeletonCard.propTypes = {
  slidesToShow: PropTypes.number,
};

export default ListSkeletonCard;
