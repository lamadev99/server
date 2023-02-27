import React from 'react'

const Hero = ({img}) => {
  return (
    <section>
        <img className='h-[25rem] md:h-[35rem] w-full object-cover' src={img} alt="" />
    </section>
  )
}

export default Hero