import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import SignUp from './auth/Auth'
import Search from './Search'
import {ImSearch} from 'react-icons/im'
import MobileNav from './MobileNav'
import { RxHamburgerMenu } from 'react-icons/rx'
import { fetchData } from '../utils/endPoints'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [openSearch, setSearchOpen] = useState(false)
  const [toggle, setToggle] = useState(false)

  const {data} = fetchData('navitem', '/category/')
  const navItems = data?.data;

  return (
    <section className='shadow-3xl z-10 itemCenter py-6 px-4 md:px-0 bg-[#0473EA] text-white'>
      <div className='m-w flex items-center justify-between'>
        <div>
          <Link to="/">Logo</Link>
        </div>
        <div className='text-xl md:flex items-center justify-between gap-4 font-bold hidden'>
          <NavLink to="/">Home</NavLink>
          {navItems?.map(item=>(
            <NavLink key={item.id} to={`/category/${item.name}`}>{item.name}</NavLink>
          ))}
          <ImSearch onClick={()=>setSearchOpen(true)} className="cursor-pointer" />
          <button onClick={()=>setOpen(true)} className='bg-blue-500 rounded-2xl px-2 text-white font-medium'>SignUp</button>
        </div>
        <div className='md:hidden flex items-center gap-4'>
          <div onClick={()=>setSearchOpen(true)} className='flex items-center gap-2 rounded-lg bg-red-500 px-2 text-white'>
            {/* <input type="search" placeholder='Search now...' className='pl-2 outline-none' /> */}
            <div>Search</div>
            <button type='submit'><ImSearch /></button>
          </div>
          <RxHamburgerMenu onClick={()=>setToggle(true)} />
        </div>

      </div>
      {open && <SignUp setOpen={setOpen} />}
      {openSearch && <Search setSearchOpen={setSearchOpen} />}
      {toggle && <MobileNav navItems={navItems} setToggle={setToggle} />}
    </section>
  )
}

export default Navbar