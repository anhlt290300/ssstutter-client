import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
const ProductCard = ({ product }) => {
  let { title, price, slug, colors, cost, mark, tag, discount } = product;
  return (
    <div className="m-2">
      <a href={`/p/${slug}`} className="hover:opacity-80 transition-all">
        <div className=" relative">
          <Image
            src={mark}
            alt=""
            className="w-full h-full aspect-[4/5] object-cover"
          />
          {tag === "new" && (
            <Image
              src="https://ssstutter.com/img/mark.png"
              className="absolute top-0 right-0 w-14 sm:w-16 drop-shadow-md"
            />
          )}
          {discount > 0 && (
            <span className="absolute top-3 left-0 py-1 px-2 bg-warning z-10  text-secondary">
              {discount}%
            </span>
          )}
        </div>
        <div className="py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h4 className="uppercase sm:truncate w-full sm:w-2/3 text-xs sm:text-lg">
              {title}
            </h4>
            {discount === 0 ? (
              <h4 className=" font-bold  sm:text-xl">{cost}</h4>
            ) : (
              <h4 className=" font-semibold line-through text-primary-300 text-md sm:text-lg">
                {cost}
              </h4>
            )}
          </div>
          <div className="flex justify-between items-center">
            <h5 className="text-primary-300 sm:text-md order-1">
              {colors} màu
            </h5>
            <div className="sm:order-1">
              <h4 className="text-warning text-lg sm:text-xl font-bold">
                {discount !== 0 && price}
              </h4>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
