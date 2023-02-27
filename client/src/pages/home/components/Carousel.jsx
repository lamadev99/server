import React from "react";
import Slider from "react-slick";
// import "react-responsive-carousel/lib/styles/carousel.min.css"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../../../utils/endPoints";
import { Parser } from 'html-to-react';
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import { useState } from "react";
import { Link } from "react-router-dom";

const parser = new Parser();

export default function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [showArrow, setShowArrow] = useState(false)
  const {data, isLoading, error} = fetchData("news", "/news/?is_featured=True")
  const featuredNews = data?.data.results

  return (
    <Slider {...settings}>
      {featuredNews?.map((news, index) => (
        <div key={index} className="h-[30rem] md:h-[40rem] w-screen relative">
          <img src={news?.image} className="h-full w-screen object-cover" alt={news.alt}/>
          <div className="absolute top-0 left-0 w-full h-full itemCenter bg-[#0a0101b4] hover:bg-[#111111de] duration-500 transition-all">
            <div className="w-full md:w-2/3 px-4 md:px-0">
              <div className="bg-green-500 w-max px-4 text-sm rounded-2xl text-white py-1 mb-4">{news.category}</div>
              <h1 className="text-2xl md:text-5xl text-cyan-500 font-bold mb-4 leading-10">{news.title}</h1>
              <div className="text-white line-clamp-3 overflow-hidden">{parser.parse(news.content)}</div>
              <Link to={`/news/${news.slug}`} state={news}>
                <button className="px-4 py-2 bg-gray-800 rounded-3xl flex items-center gap-4 mt-4 text-white" onMouseOver={()=>setShowArrow(true)} onMouseLeave={()=>setShowArrow(false)}>Read More{showArrow && <BsFillArrowRightCircleFill />}</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
