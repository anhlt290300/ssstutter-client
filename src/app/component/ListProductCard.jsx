import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const ListProductCard = ({ products, slidesToShow }) => {
  let show = slidesToShow ? slidesToShow : 1;
  const sliderRef = React.createRef();
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: show,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: true, // Enable mouse dragging
    arrows: false,
  };

  return (
    <div className=" relative w-full">
      <button
        className=" absolute z-[999] top-1/2 left-2 -translate-y-1/2"
        onClick={prevSlide}
      >
        <GrFormPrevious color="#e5e7eb" size={50} />
      </button>
      <button
        className="absolute z-10 top-1/2 right-2 -translate-y-1/2 "
        onClick={nextSlide}
      >
        <GrFormNext color="#e5e7eb" size={50} />
      </button>
      <Slider ref={sliderRef} {...settings} className="w-full">
        {products.map((item, index) => {
          return <ProductCard key={index} product={item} />;
        })}
      </Slider>
    </div>
  );
};

ListProductCard.propTypes = {
  products: PropTypes.array.isRequired,
  slidesToShow: PropTypes.number,
};

export default ListProductCard;
