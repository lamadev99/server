import React from "react";
import { carouselItems } from "../../../assets/data";
import Card from "../../../components/Card";

const PostList = () => {
  return (
    <section className="mt-8">
      <h1 className="text-2xl font-bold mb-2">Jenny Doe - All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {carouselItems.slice(1, 5).map((item) => {
          return <Card key={item.id} news={item} />;
        })}
      </div>
      <div className="flex items-center justify-center mt-6">
        <button className="bg-blue-600 px-4 py-2 text-white">Load More</button>
      </div>
    </section>
  );
};

export default PostList;
