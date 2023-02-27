import React from 'react'
import {useParams } from 'react-router-dom'
import Hero from '../../components/Hero'
import NewsList from '../../components/NewsList'

const Category = () => {
  const {slug} = useParams()

  return (
    <main>
        <Hero img={`https://source.unsplash.com/random/?${slug}/`} />
        <div className='itemCenter px-4'>
            <div className='m-w'>
                <NewsList qKey={slug} fn={`/news/?category=${slug}`} title={slug} />
            </div>
        </div>
    </main>
  )
}

export default Category