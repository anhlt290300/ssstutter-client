import React, { useEffect, useState } from "react";
import SkeletonCard from "@/app/component/SkeletonCard";
import ProductCard from "@/app/component/ProductCard";
import { getProductCards } from "@/apollo/queries";
import { useQuery } from "@apollo/client";

const ListItemByCategory = ({ category, update, setUpdate }) => {
  let category_ = category === undefined ? null : category;
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const { loading, error, data } = useQuery(getProductCards, {
    variables: { page: page, category: category_ },
  });

  useEffect(() => {
    if (data && update) {
      setList(() => [...list, ...data.getProductCards.products]);
      setUpdate(false);
      setPage((page) => page + 1);
    }
  }, [loading, error, data, update, list, setUpdate]);
  return (
    <div className="item-group grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => {
        return <ProductCard key={index} product={item} />;
      })}
    </div>
  );
};

export default ListItemByCategory;
