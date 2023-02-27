import React from "react";
import { carouselItems } from "../../../assets/data";
import Card from "../../../components/Card";

const SimilarPost = () => {
  return (
    <section className="mt-8">
      <h1 className="text-2xl mb-2">You may like this</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {carouselItems.slice(0, 3).map((item) => {
          return <Card key={item.id} news={item} />;
        })}
      </div>
    </section>
  );
};

export default SimilarPost;
