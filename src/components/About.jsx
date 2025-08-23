import React from 'react'
import jgo from '../assets/bro.jpg'

const About = () => {
  return (
    <div className="self-center flex w-full max-w-[1204px] items-start justify-between gap-5 mt-48 px-5 max-md:max-w-full max-md:flex-wrap" id='about'>
      <div className="self-center flex flex-col my-auto max-md:max-w-full">
        <div className="flex w-[170px] max-w-full items-start gap-4">
          <div className="bg-zinc-300 self-center flex w-4 h-0.5 flex-col my-auto" />
          <div className="text-white text-xs font-medium leading-6 tracking-[7.5px] self-stretch w-[209px]">
            MY NAME IS
          </div>
        </div>
        <div className="text-white text-5xl font-bold mt-9">
          <span className="text-white">Jason Zhao</span>

        </div>
        <div className="text-gray-800 text-base leading-8 w-[538px] max-w-full mt-9 text-white">
          Hey there 👋, I'm Jason Zhao, a 20-year-old student aspiring to become a
          <span className='text-indigo-400 font-bold '> Software Engineer</span>. Ever since I was little i've always been intrigued by the idea of creating something that can be used by millions of people around the world.
        </div>
        <div className="items-start flex w-48 max-w-full justify-between gap-5 mt-12 max-md:justify-center">
          <a href="https://www.instagram.com/jason.zhaooo/">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/792db86d-ce8d-4d59-a26f-5559b4d70dbc?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
              className="aspect-square object-cover object-center w-6 shrink-0"
            />
          </a>
          <a href="https://github.com/zhaojzn">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8057ab0-e7d9-4537-9ee0-4026f3ad7c74?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
              className="aspect-square object-cover object-center w-6 shrink-0"
            />
          </a>
          <a href='https://www.linkedin.com/in/jason-zhao-bab03b187/'>
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b4a77d4-932c-4158-9bc2-375ec77b9a89?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
              className="aspect-square object-cover object-center w-6 shrink-0"
            />
          </a>
        </div>
      </div>
      <img
        loading="lazy"
        src={jgo}
        //resize the image to make it smaller
        className="aspect-[0.86] object-cover object-center w-[512px] self-stretch rounded-2xl"

      />
    </div>


  )
}

export default About