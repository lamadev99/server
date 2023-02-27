import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";


const MobileNav = ({ setToggle, navItems }) => {
  return (
    <section className="absolute top-0 right-0 bg-[#111111e4] w-3/4 h-screen p-8">
      <AiOutlineClose onClick={() => setToggle(false)} className="text-white text-3xl absolute right-4 top-3" />
      <div className="text-white flex flex-col gap-4 font-semibold text-xl">
        <NavLink to="/" onClick={() => setToggle(false)}>Home</NavLink>
        {navItems?.map(item => (
          <NavLink onClick={() => setToggle(false)} key={item.id} to={`/category/${item.name}`}>{item.name}</NavLink>
        ))}
      </div>
    </section>
  );
};

export default MobileNav;
