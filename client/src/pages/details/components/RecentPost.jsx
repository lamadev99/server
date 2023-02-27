import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchData } from '../../../utils/endPoints'

const RecentPost = () => {
  const {slug} = useParams()
  const {data, isLoading, error} = fetchData('recent','/news/?records=6')
  const news = data?.data.results
  const recentNews = news?.filter(item =>item.slug !== slug)
  // const recentNews = news

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  
  return (
    <section className='bg-white p-4 shadow-xl md:sticky md:top-20'>
      <h1 className='text-xl'>Recent Post</h1>
      <hr />
      <div className=''>
        {recentNews?.map((item, index)=>(
          <Link to={`/news/${item.slug}`} state={item} key={index} onClick={()=>window.scroll(0,0)} >
            <div className='mt-4 grid grid-cols-2 items-center gap-1'>
              <img src={item.image} alt={item.alt} />
              <div className='text-[12px] font-semibold text-gray-500 hover:text-blue-500 line-clamp-3'>{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RecentPost