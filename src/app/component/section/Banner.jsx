import React from "react";
import Slider from "react-slick";
const Banner3 = [
  {
    slug: "/lookbook/enoughism-the-city",
    image: "https://dashboard.leanow.vn/upload/10-2023/1697306000348.webp",
    alt: "THE CITY",
  },
  {
    slug: "/lookbook/enoughism-the-city",
    image: "https://dashboard.leanow.vn/upload/9-2023/1695628724171.webp",
    alt: "ENOUGHISM",
  },
];
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: true, // Enable mouse dragging
    arrows: false,
  };
  return (
    <section className="py-20 sm:py-52 w-full">
      <Slider {...settings}>
        {Banner3.map((item, index) => {
          return (
            <a key={index} href={item.slug}>
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full sm:aspect-[16/3] object-cover "
              />
            </a>
          );
        })}
      </Slider>
    </section>
  );
};

export default Banner;
