import React from 'react'
import { useLocation } from 'react-router-dom'
import CommentBox from './components/CommentBox';
import Hero from '../../components/Hero'
// import Category from './components/Category';
import MainContent from './components/MainContent';
import RecentPost from './components/RecentPost';
import SocialCard from './components/SocialCard';
import NewsList from '../../components/NewsList';
import { motion, useScroll } from "framer-motion"
import { useState } from 'react';
import { useEffect } from 'react';


const Details = () => {
  const { state } = useLocation();
  const { scrollYProgress } = useScroll();
  const [videoId, setVideoId] = useState();

  useEffect(()=>{
    const oembedRegex = /<oembed[^>]*>/g;
    let newsContent = state.content
    const oembedMatch = newsContent.match(oembedRegex);
    if (oembedMatch) {
      const oembedUrl = oembedMatch[0].match(/url="([^"]*)"/)[1];
      const videoId = oembedUrl.substring(oembedUrl.lastIndexOf("/") + 1);
      setVideoId(videoId);
    }

  }, [])
  
  return (
    <main>
      {state?.is_video ? <iframe className='w-full h-[32rem]' src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen /> : <Hero img={state?.image} />}
      <motion.div style={{ scaleX: scrollYProgress }} />
      <div className='itemCenter my-4'>
        <div className='m-w grid grid-cols-1 md:grid-cols-12 gap-8 px-4 relative'>
          <div className='col-span-1'>
            <SocialCard title={state?.title} />
          </div>
          <div className={`col-span-12 md:col-span-8 relative ${state?.is_video ? 'top-0 delay-500' : '-top-44'}`}>
            <MainContent data={state} />
            <CommentBox />
            <NewsList qKey="similar" fn={`/news/?category=${state?.category}`} title="You may like this" />
          </div>
          <div className='col-span-12 md:col-span-3 px-4 md:px-0 py-8'>
            {/* <Category/> */}
            <RecentPost />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Details