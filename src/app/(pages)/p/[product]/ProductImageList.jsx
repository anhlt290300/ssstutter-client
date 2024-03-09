import React from "react";
import PropTypes from "prop-types";
import SkeletonImage from "@/app/component/SkeletonImage";

const ProductImageList = ({ loading, color, colors }) => {
  return (
    <div className="w-full border-b sm:border-none">
      <div className="w-full sm:grid sm:grid-cols-4  gap-2 overflow-auto">
        <div className="hidden sm:block h-full">
          <div className="flex flex-col justify-between h-full">
            {!color &&
              colors.length > 0 &&
              colors[0].images.map((item, index) => {
                if (index < 3)
                  return (
                    <img
                      key={index}
                      className="aspect-[4/5] object-cover brightness-50 hover:brightness-100"
                      src={item}
                      alt=""
                    />
                  );
              })}
            {color &&
              color.images.map((item, index) => {
                if (index < 3)
                  return (
                    <img
                      key={index}
                      className="aspect-[4/5] object-cover brightness-50 hover:brightness-100"
                      src={item}
                      alt=""
                    />
                  );
              })}
          </div>
        </div>
        <div className="w-full col-span-3">
          {!color && colors.length > 0 && (
            <img
              className="aspect-[4/5] object-cover"
              src={colors[0].images[0]}
              alt=""
            />
          )}
          {color && (
            <img
              className="aspect-[4/5] object-cover"
              src={color.images[0]}
              alt=""
            />
          )}
          {loading && (
            <div className=" aspect-[4/5]">
              <SkeletonImage />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductImageList.propTypes = {
  color: PropTypes.object,
  colors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ProductImageList;
