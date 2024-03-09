import React from "react";
import { getProductCardsByTag } from "@/apollo/queries.js";
import ListProductCard from "../../../component/ListProductCard.jsx";
import ListSkeletonCard from "../../../component/ListSkeletonCard.jsx";
import { useQuery } from "@apollo/client";

const Recommend = () => {
  const { loading, error, data } = useQuery(getProductCardsByTag, {
    variables: { page: 1, tag: "new" },
  });

  if (loading)
    return (
      <div className="p-4 border-t sm:p-16">
        <h4 className="uppercase text-sm sm:text-xl mb-4">có thể bạn sẽ thích</h4>
        <ListSkeletonCard slidesToShow={4} />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const rs = data.getProductCardsByTag;
  return (
    <div className="p-4 border-t sm:p-16">
      <h4 className="uppercase text-sm sm:text-xl mb-4">có thể bạn sẽ thích</h4>
      <ListProductCard products={rs.products} slidesToShow={4} />
    </div>
  );
};

export default Recommend;
