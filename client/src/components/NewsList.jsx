import { Button } from '@mui/material'
import React, { useState } from 'react'
import { fetchData } from '../utils/endPoints'
import Card from './Card'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skeleton from './Skeleton';


const NewsList = ({ qKey, fn, title }) => {
  // const [newsList, setNewsList] = useState();
  const { data, isLoading, error } = fetchData(qKey, fn)
  const newsList = data?.data
  const count = data?.data.count

  if (isLoading) {
    <Skeleton/>
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }


  return (
    <section className='my-8 relative'>
      <div className='mb-4'>
        {count > 0 && <h1 className='text-2xl md:text-3xl font-bold'>{title}({count})</h1>}
        <div className='w-full h-1 bg-red-500' />
      </div>
      {count === 0 && <div>This category news not found yet</div>}
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {newsList?.results.map((news, index) => {
            return (
              <Card key={index} isLoading={isLoading} news={news} />
            )
          })}
        </div>
        {/* <div className='absolute right-4 bottom-2 flex items-center gap-4'>
        {newsList?.previous && <Button onClick={()=>Paginate(newsList.previous)} variant="outlined" startIcon={<ArrowBackIcon />}>Prev</Button>}
        {newsList?.next && <Button onClick={()=>Paginate(newsList.next)} size='small' variant="outlined" endIcon={<ArrowForwardIcon />}>Next</Button>}
      </div> */}
      </div>
    </section>
  )
}

export default NewsList