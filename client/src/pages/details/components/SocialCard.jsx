import React from "react";
import { FaLink } from "react-icons/fa";
import { FiFacebook, FiTwitter, FiMail } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const SocialCard = ({title}) => {
  const {slug} = useParams()
  const URL = 'http://localhost:5173/news/'+slug;

  return (
    <div className="fixed md:sticky top-40 left-0 md:bg-white w-[max-width] h-auto z-40">
      <div className="flex items-center gap-4 flex-col py-4 text-white md:text-3xl">
        <Link to={`https://www.facebook.com/sharer.php?u=${URL}`} target="_blank">
          <FiFacebook className="bg-blue-400 hover:rounded-full duration-500 transition-all" />
        </Link>
        <Link to={`https://twitter.com/intent/tweet?url=${URL}`} target="_blank">
          <FiTwitter className="bg-cyan-500 hover:rounded-full duration-500 transition-all" />
        </Link>
        <Link to={`mailto:subject=${title}&body=${URL}`} target="_blank">
          <FiMail className="bg-red-600 hover:rounded-full duration-500 transition-all" />
        </Link>
        <FaLink className="text-gray-500 cursor-pointer" onClick={()=>navigator.clipboard.writeText(URL)} />
      </div>
    </div>
  ); 
};

export default SocialCard;
