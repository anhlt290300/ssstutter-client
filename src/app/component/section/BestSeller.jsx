import React from "react";
import { useQuery } from "@apollo/client";
import { getProductCards } from "../../../apollo/queries.js";
import ProductCard from "../ProductCard.jsx";
import SkeletonCard from "../SkeletonCard.jsx";

const BestSeller = () => {
  const { loading, error, data } = useQuery(getProductCards, {
    variables: { page: 1 },
  });

  if (loading)
    return (
      <section className="px-4 pt-10 ">
        <div className="flex items-center justify-center flex-col">
          <div className="py-4 w-full sm:w-2/3 sm:p-16 flex items-center justify-center">
            <h2 className=" uppercase font-bold text-5xl">best seller</h2>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 p-4 sm:gap-10 sm:p-14 w-full">
          <div>
            <label htmlFor="filter_shirt">
              <input
                type="radio"
                hidden
                id="filter_shirt"
                className="w-4 h-4 rounded-full peer focus:ring-2"
                value="so-mi"
              />
              <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
                Sơ mi
              </h3>
            </label>
          </div>
          <div>
            <label htmlFor="filter_pant">
              <input
                type="radio"
                hidden
                id="filter_pant"
                className="w-4 h-4 rounded-full peer focus:ring-2"
                value="quan"
              />
              <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
                quần
              </h3>
            </label>
          </div>
          <div>
            <label htmlFor="filter_tee">
              <input
                type="radio"
                hidden
                id="filter_tee"
                className="w-4 h-4 rounded-full peer focus:ring-2"
                value="ao-thun"
              />
              <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
                áo thun
              </h3>
            </label>
          </div>
          <div>
            <label htmlFor="filter_jacket">
              <input
                type="radio"
                hidden
                id="filter_jacket"
                className="w-4 h-4 rounded-full peer focus:ring-2"
                value="ao-khoac"
              />
              <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
                áo khoác
              </h3>
            </label>
          </div>
        </div>
        <div className="item-group grid grid-cols-2 sm:grid-cols-4 w-full">
          {new Array(8).fill(undefined).map((item, index) => {
            return <SkeletonCard key={index} />;
          })}
        </div>
      </section>
    );
  if (error) return <p>Error: {error.message}</p>;
  const rs = data.getProductCards;
  return (
    <section className="px-4 pt-10 ">
      <div className="flex items-center justify-center flex-col">
        <div className="py-4 w-full sm:w-2/3 sm:p-16 flex items-center justify-center">
          <h2 className=" uppercase font-bold text-5xl">best seller</h2>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 p-4 sm:gap-10 sm:p-14">
        <div>
          <label htmlFor="filter_shirt">
            <input
              type="radio"
              hidden
              id="filter_shirt"
              className="w-4 h-4 rounded-full peer focus:ring-2"
              value="so-mi"
            />
            <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
              Sơ mi
            </h3>
          </label>
        </div>
        <div>
          <label htmlFor="filter_pant">
            <input
              type="radio"
              hidden
              id="filter_pant"
              className="w-4 h-4 rounded-full peer focus:ring-2"
              value="quan"
            />
            <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
              quần
            </h3>
          </label>
        </div>
        <div>
          <label htmlFor="filter_tee">
            <input
              type="radio"
              hidden
              id="filter_tee"
              className="w-4 h-4 rounded-full peer focus:ring-2"
              value="ao-thun"
            />
            <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
              áo thun
            </h3>
          </label>
        </div>
        <div>
          <label htmlFor="filter_jacket">
            <input
              type="radio"
              hidden
              id="filter_jacket"
              className="w-4 h-4 rounded-full peer focus:ring-2"
              value="ao-khoac"
            />
            <h3 className="text-md sm:text-xl relative uppercase cursor-pointer after:absolute after:transition-all after:bottom-0 after:rounded after:left-0 after:bg-black after:h-1 after:w-0 peer-checked:after:w-full">
              áo khoác
            </h3>
          </label>
        </div>
      </div>
      <div className="item-group grid grid-cols-2 sm:grid-cols-4">
        {rs.products.map((item, index) => {
          return <ProductCard key={index} product={item} />;
        })}
      </div>
    </section>
  );
};

export default BestSeller;
