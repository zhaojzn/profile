import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import resume from '../assets/jason_resume.pdf'
import dropdown from '../assets/dropdown.png'
const Navbar = () => {



  // make a scroll function so it has a paramter of the id of the element you want to scroll to
  // then use document.querySelector to find the element

  const scroll = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }





  return (
    <div className="items-start self-center flex w-full max-w-[1213px] justify-between gap-5 ml-2 mt-10 px-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
      {/* <img
      loading="lazy"
      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a248928a-0503-4d2a-a482-04c048fa227e?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
      className="aspect-[2.78] object-cover object-center w-[114px] self-center shrink-0 my-auto"
    /> */}
      <div className="justify-between items-start self-center flex w-[493px] max-w-full gap-5 my-auto max-md:flex-wrap max-md:justify-center">
        <div className="text-white text-base font-medium self-stretch">

          <button onClick={() => scroll('#special')}>
            Service
          </button>
        </div>
        <div className="text-white text-base self-stretch">
          <button onClick={() => scroll('#projects')}>
            Portfolios
          </button>
        </div>
        <div className="text-white text-base self-stretch">
          <button onClick={() => scroll('#work')}>
            Experience
          </button>
        </div>
        <div className="text-white text-base self-stretch">
          <button onClick={() => scroll('#contact')}>
            Contact
          </button>
        </div>

      </div>
      <div className="items-start self-stretch flex w-[158px] max-w-full justify-between gap-5 md:flex hidden">
        <div className="justify-center items-center border border-[color:var(--Light-2,#F1F1F1)] self-stretch flex w-[102px] max-w-full flex-col px-5 py-4 rounded-lg border-solid">
          <div className="text-white text-sm font-medium self-center">
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar