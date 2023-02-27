import React, { useState } from "react";
import Hero from "../../components/Hero";
import { BsFacebook, BsInstagram, BsTwitter, BsPencilSquare, BsVectorPen } from "react-icons/bs";
import Post from "./components/Post";
import ProfileForm from "./components/ProfileForm";
import { Link, useLocation, useParams } from "react-router-dom";
import NewsList from "../../components/NewsList";

const AuthorInfo = () => {
  const {id} = useParams()
  const {state} = useLocation()
  
  const [open, setOpen] = useState(false)
  const [openProfileForm, setProfileFormOpen] = useState(false)

  return (
    <main className="">
      <Hero img="https://source.unsplash.com/random/?nepal/" />

      <div className="itemCenter px-4 md:px-0 mb-8">
        <div className="relative m-w">
          <div className="flex items-center justify-center">
            <img src={state?.image} alt="" className="absolute -top-40 mx-auto w-60 h-60 rounded-full border-2 object-cover border-red-500 shadow-lg"/>
            <div className="mt-10 text-center bg-white p-4">
              <h1 className="text-2xl font-bold uppercase pt-8">{state?.name}</h1>
              <div onClick={()=>setProfileFormOpen(true)} className="absolute right-2 top-12 flex items-center gap-1 text-blue-500 cursor-pointer hover:text-black"><BsVectorPen/> _edit</div>
              <p className="text-gray-600">{state?.bio}</p>
              <div className="flex items-center gap-2">
                <span className="text-blue-800">Follow me:</span>
                <BsFacebook className="text-blue-500" />
                <BsTwitter />
                <BsInstagram />
            </div>
            </div>
          </div>

          <div className="mt-4">
            <div>Total Post(s) : 34</div>
            {/* <Link to="/write-news">
            </Link> */}
              <button onClick={()=>setOpen(true)} className="bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 text-white hover:bg-black"><BsPencilSquare/>Write New Post</button>
          </div>
          {/* <PostList/> */}
          <NewsList qKey="authornews" fn={`/news/?writer=${id}`} title="All Posts" />
        </div>
      </div>
      {open && <Post setOpen={setOpen} />}
      {openProfileForm && <ProfileForm setProfileFormOpen={setProfileFormOpen} />}
    </main>
  );
};

export default AuthorInfo;
