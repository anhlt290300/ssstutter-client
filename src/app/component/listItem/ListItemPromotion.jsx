import React from "react";
import SkeletonCard from "@/app/component/SkeletonCard";
import ProductCard from "@/app/component/ProductCard";
import { getProductCardsPromotion } from "@/apollo/queries";
import { useQuery } from "@apollo/client";

const ListItemPromotion = ({ page, promotion }) => {
  const { loading, error, data } = useQuery(getProductCardsPromotion, {
    variables: {
      page: page ? page : 1,
      promotion: promotion ? promotion : true,
    },
  });
  if (loading)
    return (
      <div className="item-group grid grid-cols-2 sm:grid-cols-4 ">
        {new Array(8).fill(undefined).map((item, index) => {
          return <SkeletonCard key={index} />;
        })}
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const rs = data.getProductCardsPromotion;
  return (
    <div className="item-group grid grid-cols-2 sm:grid-cols-4">
      {rs.products.map((item, index) => {
        return <ProductCard key={index} product={item} />;
      })}
    </div>
  );
};

export default ListItemPromotion;
