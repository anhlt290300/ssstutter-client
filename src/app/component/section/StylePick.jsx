import React from "react";
import { useQuery } from "@apollo/client";
import { getProductCards } from "../../../apollo/queries.js";
import ProductCard from "../ProductCard.jsx";
import ListProductCard from "../ListProductCard.jsx";

const StylePick = () => {
  const { loading, error, data } = useQuery(getProductCards, {
    variables: { page: 1 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const rs = data.getProductCards;
  return (
    <section className="px-4 py-6 sm:px-20">
      <div className="flex items-center justify-center flex-col">
        <div className="py-4 w-full sm:w-2/3 sm:p-16 flex items-center justify-center">
          <h2 className=" uppercase font-bold text-5xl">style pick!</h2>
        </div>
      </div>

      <div className=" w-full">
        <ListProductCard products={rs.products} slidesToShow={3} />
      </div>
    </section>
  );
};

export default StylePick;
