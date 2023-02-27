import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFacebook, BsInstagram, BsTwitter, BsStopwatch } from "react-icons/bs";
import { FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Parser } from 'html-to-react';
const parser = new Parser()
import moment from "moment";
import { timeCount } from "../../../utils/timeCount";


const MainContent = ({ data }) => {
  const writer = data?.writer

  return (
    <section className="bg-white p-4 md:p-8">
      <div className="bg-blue-600 text-white px-4 rounded-3xl w-[max-content] mb-4">
        {data.category}
      </div>
      <h1 className="text-2xl md:text-4xl text-blue-600 font-bold">{data.title}</h1>
      <div className="flex items-center  gap-4 text-gray-500 mt-4 md:mt-8">
        <Link to={`/author/${data?.writer.id}`} state={data?.writer} className="hidden md:block">
          <div className="flex md:flex-row flex-col items-center gap-2">
            <img src={data?.writer.image} alt="" className="w-6 h-6 rounded-full object-cover" />
            <span className="text-blue-600 font-bold">{data?.writer.name}</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <AiOutlineCalendar />
          <span>{moment(data.created_at).format("MMM Do YY")}</span>
        </div>
        <div className="flex items-center gap-2">
          <BsStopwatch />
          <span>{timeCount(data.content)} Min.</span>
        </div>
        {/* <a href="/news/1">
        <div className="flex items-center gap-2 text-blue-500 hover:font-semibold">
          <FaRegComments/>
          <span>Add Comment</span>
        </div>
        </a> */}
      </div>
      <hr />
      <div className="mt-4 first-letter:text-4xl first-letter:font-bold first-letter:text-gray-700">{parser.parse(data.content)}</div>
      {/* Author Info */}
      <div className="pt-8">
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-between gap-4 py-6">
          <div className="flex items-center flex-col gap-4">
            <img src={writer.image} alt="" className="w-20 h-20 rounded-full object-cover md:col-span-1" />
            <div className="flex item-center gap-2 text-2xl">
              {writer.fUrl && <Link to={`/${writer.fUrl}`} target="_blank"><BsFacebook className="text-blue-500" /></Link>}
              {writer.tUrl && <Link to={`/${writer.tUrl}`}><BsTwitter className="text-cyan-500" /></Link>}
              {writer.iUrl && <Link to={`/${writer.iUrl}`}><BsInstagram className="text-red-500" /></Link>}
            </div>
            <div>
              <Link to={`/author/${writer.id}`} state={data.writer}>
                <button className="bg-cyan-600 px-3 rounded-3xl text-white hover:bg-black">All Posts</button>
              </Link>

            </div>
          </div>
          <div className="md:col-span-5">
            <h1 className="text-2xl font-bold">{data?.writer.name}</h1>
            <p>{data?.writer.bio}</p>
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default MainContent;
