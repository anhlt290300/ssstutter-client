import React from "react";
import { useQuery } from "@apollo/client";
import { getProductCardsByTag } from "../../../apollo/queries.js";

import ListProductCard from "../ListProductCard.jsx";
import ListSkeletonCard from "../ListSkeletonCard.jsx";

const Suggest = () => {
  const { loading, error, data } = useQuery(getProductCardsByTag, {
    variables: { page: 1, tag: "new" },
  });

  if (loading)
    return (
      <section className="px-4 py-10  sm:px-20">
        <div className="flex items-center justify-center flex-col">
          <div className="py-4 w-full sm:w-2/3 sm:p-16 flex items-center justify-center">
            <h2 className="font-bold text-5xl">What&apos;s NEW?</h2>
          </div>
          <ListSkeletonCard slidesToShow={4} />
        </div>
      </section>
    );
  if (error) return <p>Error: {error.message}</p>;
  const rs = data.getProductCardsByTag;
  return (
    <section className="px-4 py-10  sm:px-20">
      <div className="flex items-center justify-center flex-col">
        <div className="py-4 w-full sm:w-2/3 sm:p-16 flex items-center justify-center">
          <h2 className="font-bold text-5xl">What&apos;s NEW?</h2>
        </div>
        <ListProductCard products={rs.products} slidesToShow={4} />
      </div>
    </section>
  );
};

export default Suggest;
