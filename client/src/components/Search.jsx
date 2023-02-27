import React, { useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { Parser } from 'html-to-react'
import { Link } from 'react-router-dom';
import {ImSearch} from 'react-icons/im'

const parser = new Parser()

const Search = ({ setSearchOpen }) => {
  const [query, setQuery] = useState('')
  const [searchItems, setSearchItems] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    const url = `https://news.goenergy.com.np/api/news/?search=${query}`
    try {
      const { data } = await axios.get(url);
      setSearchItems(data);
      e.target.reset;
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <main className='bg-[#1111115f] fixed top-0 left-0 w-full h-full itemCenter'>
      <div className='m-w px-4 md:px-20'>
        <HighlightOffIcon onClick={() => setSearchOpen(false)} className='absolute right-4 top-20 cursor-pointer text-white' />
        <form className='w-full h-16 md:h-20 mb-8 mt-4 text-2xl flex'>
          <input autoFocus={true} onChange={(e) => setQuery(e.target.value)} type="search" placeholder='Search...' required className='text-black w-4/5 h-full outline-none pl-4 capitalize' />
          <button className='bg-blue-500 h-full w-1/5 text-white hover:bg-blue-700 flex items-center justify-center gap-4' type='submit' onClick={handleSearch}><ImSearch/><span className='hidden md:inline-block'>Search</span> </button>
        </form>
        {searchItems?.results.length <= 0 ? <div className='w-full max-h-[30rem] bg-white text-3xl p-8 italic text-black'>Your '{query}' items does not found yet. </div> :searchItems?.count >= 1 && <section className='w-full max-h-[30rem] bg-white overflow-scroll scro'>
          <div className='p-2 md:p-6'>
            {searchItems?.results.map((item, index) => (
              <Link key={index} to={`/news/${item.slug}`} state={item} onClick={() => setSearchOpen(false)}>
                <div className="flex items-center gap-4 bg-[#F1F5F8] mb-2">
                  <img src={item.image} alt="" className='w-20 h-16 md:w-32 md:h-20 object-cover' />
                  <div>
                    <h1 className='text-xl md:text-3xl text-blue-500 hover:text-red-500 line-clamp-1'>{item.title}</h1>
                    <div className='line-clamp-2 italic text-black'>{parser.parse(item.content)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>}
      </div>
    </main>
  )
}

export default Search