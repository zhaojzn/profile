import React from 'react'
import z from '../../assets/z.png'
const Projects = () => {
  return (
      <div className="self-center flex w-full max-w-[1195px] flex-col mt-32 max-md:max-w-full" id='projects'>
        <div className="self-center flex ml-0 w-[141px] max-w-full items-start gap-4 mt-20">
            <div className="bg-white self-center flex w-4 h-0.5 flex-col my-auto" />
                <div className="text-white text-xs font-medium leading-6 tracking-[8.5px] self-stretch w-[209px]">
                PORTFOLIO
            </div>
        </div>
        <div className="text-white text-4xl font-bold self-center mt-7">
        PERSONAL PROJECTS
        </div>
        <div className="self-center w-full max-w-[1195px] mt-40 px-5 max-md:max-w-full">


        
          



        <div className="flex flex-col justify-center gap-2 overflow-hidden p-3 shadow-inner lg:flex-row">
          <div className='mx-auto flex h-full w-5/6 flex-col items-center justify-center rounded-lg border border-neutral-600 border-opacity-50 bg-neutral-800 sm:w-96 lg:mx-1'>
          <div className="flex h-full w-full flex-col items-center justify-center">
          <img
            className="h-96 w-full rounded-tl-lg rounded-tr-lg object-cover opacity-100 shadow-2xl transition duration-100 hover:opacity-80"
            src={z}
            alt="project"
          />

        <div className="flex h-full w-full flex-col px-3 pb-4 pt-2 text-white">
          <h1 className="text-center text-2xl font-semibold">PGSS Chat</h1>
          <p className="border-t border-b border-neutral-700 py-2 text-center">
            Test
          </p>
          {/* <a className="text-3xl mt-2 opacity-40 hover:opacity-100 transition duration-100" href={link}>
            <i className={icons_dict["Github"]} />
          </a> */}
          <div className="mt-3 flex flex-row content-start justify-start">

          </div>
        </div>
      </div>
          </div>


          {/* <div className="flex flex-col items-stretch w-[33%] max-md:w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf414556-4a1a-403d-a662-4ac47f7dec2f?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
              className="aspect-[0.9] object-cover object-center w-full grow rounded-lg max-md:mt-12"
            />
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6be8fd71-926b-4b74-94ae-f33792132dbb?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
              className="aspect-[0.9] object-cover object-center w-full grow rounded-lg max-md:mt-12"
            />
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/fa646196-7e22-4a02-9a13-a959a4de5b25?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
              className="aspect-[0.9] object-cover object-center w-full grow rounded-lg max-md:mt-12"
            />
          </div> */}
        </div>
      </div>
      </div>
  )
}

export default Projects