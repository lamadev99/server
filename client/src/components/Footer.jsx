import axios from "axios";
import React, { useState } from "react";

const Footer = () => {
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    try{
      const res = await axios.post('https://news.goenergy.com.np/api/subscription/', {email})
      console.log(res);
      if(res.status === 201){
        setMsg("Congratulation, subscription has been completed successfully!")
        e.target.reset();
      }else{
        setMsg("Something went wrong! Please try again.")
      }
    }catch(e){
      console.log(e);
    }
  }

  return (
    <section className="bg-gray-800 text-white pb-14 px-6">
      <div className="itemCenter">
        <div className="m-w grid grid-cols-1 md:grid-cols-3 py-8 gap-8">
          <div>
            <div className="logo">
              <h1 className="text-2xl">Logo Here</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum vero vitae illo nobis, illum laboriosam aliquam rerum similique repudiandae at!</p>
            </div>
          </div>
          <div>
            <h1 className="text-2xl">Email Newsletter</h1>
            <small>
              Subscribe to receive inspiration, news, and ideas in your inbox
            </small>
            <form className="flex item-center" onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Enter your email address" required className="w-full h-10 mb-2 outline-none pl-4 text-black"/>
              <button className="bg-red-500 w-auto px-4 h-10" type="submit">Subscirbe</button>
            </form>
            <div className="italic">{msg}</div>
          </div>
          <div>
            <h1 className="text-2xl">Help & Support</h1>
            <ul>
              <li>Support</li>
              <li>Terms of use</li>
              <li>Communication Guidlines</li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center mt-4">Copyright © 2023 · Created by Lama · Powered by Golden Duck Enterprise.</p>
    </section>
  );
};

export default Footer;
