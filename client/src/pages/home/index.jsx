import React from 'react'
import NewsList from '../../components/NewsList'
import MostPopular from './components/MostPopular'
import Carousel from './components/Carousel'

const Home = () => {
  // const latestNews = fetchData("news", "/all-news/");
  // const videoNews = fetchData("video", "/news/?is_video=True");
  // const writerSuggestedNews = fetchData("suggestion", "/news/?is_writer_pick=True");
  
  return (
    <main>
      <Carousel/>
      <div className='itemCenter px-4 md:px-0'>
        <div className='m-w grid md:grid-cols-4 grid-cols-1 gap-4'>
          <div className='col-span-3'>
          <NewsList qKey="news" fn="/news/" title="Latest News"/>
          <NewsList qKey="video" fn="/news/?is_video=True" title="Video News"/>
          <NewsList qKey="suggestion" fn="/news/?is_writer_pick=True" title="Writer Suggested News"/>
          </div>
          <div className='col-span-1'>
            <MostPopular/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home