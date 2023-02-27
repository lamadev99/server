import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Skeleton from '../../../components/Skeleton'
import { fetchData } from '../../../utils/endPoints'

const MostPopular = () => {
  const {data, isLoading, error} = fetchData('popular','/news/1/mostPopular/')
  const popularNews = data?.data

  if (isLoading) {
    <Skeleton/>
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  
  return (
    <section className='bg-white p-4 shadow-xl sticky top-20 w-full'>
      <h1 className='text-xl'>Most Popular Post</h1>
      <hr />
      <div>
        {popularNews?.map((item, index)=>(
          <Link to={`/news/${item.slug}`} state={item} key={index} onClick={()=>window.scroll(0,0)} >
            <div className='mt-4 grid grid-cols-2 items-center gap-1 hover:shadow-2xl duration-500 transition-all bg-[#F1F5F8]'>
              <img src={item.image} alt={item.alt} />
              <div className='text-[12px] font-semibold text-gray-500 hover:text-blue-500 line-clamp-3'>{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default MostPopular