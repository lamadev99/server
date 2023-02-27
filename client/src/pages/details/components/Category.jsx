import React from "react";
import { Link } from "react-router-dom";
import { category } from "../../../assets/data";

const Category = () => {
  return (
    <div className="bg-white p-4 mb-8">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div>
          {category.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex items-center justify-between">
                <Link to="/">{item.title}</Link>
                <span className="w-8 h-8 bg-red-500 rounded-full p-2">{item.num}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
