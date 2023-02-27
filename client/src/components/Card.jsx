import React from "react";
import { AiOutlineCalendar, AiFillYoutube } from "react-icons/ai";
import { BsStopwatch } from 'react-icons/bs'
import { Link } from "react-router-dom";
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')
import { timeCount } from "../utils/timeCount";

const Card = ({ news}) => {
  
  return (
    <Link to={`/news/${news.slug}`} state={news} onClick={() => window.scroll(0, 0)}>
      <div className="bg-white shadow-lg relative overflow-hidden">
        {news.is_video && <div className="absolute w-full h-[10rem] bg-[#111111a8] flex items-center justify-center">
          <AiFillYoutube className="text-4xl text-red-500" />
        </div>}
        <img src={news?.image} alt={news?.alt} className="w-full h-[10rem] object-cover hover:scale-125 duration-500 transition-all" />
        <div className="px-4 py-2 z-40 relative">
          <div className="flex items-center gap-2 absolute right-2 -top-2 bg-red-500 px-2 text-white"><BsStopwatch />{timeCount(news.content)} min.</div>
          <h1 className="text-xl md:text-2xl font-bold hover:text-blue-500 line-clamp-2 mt-4">{news.title}</h1>
          <hr />
          <div className="flex items-center justify-between flex-wrap py-2">
            <div className="flex items-center gap-1">
              <img src={news.writer?.image} alt="" className="w-6 h-6 rounded-full object-cover" />
              <span>{news.writer?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <AiOutlineCalendar />
              <span>{moment(news.created_at).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="bg-blue-500 absolute top-4 left-4 px-2 rounded-xl">
          <span className="text-white">{news.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
