import React from 'react'

const WorkItem = (props) => {

    const state = props.currentCompany === props.company;

    return (
        <div className="mt-5">
            {state ? (
                <div className="justify-between items-center rounded bg-neutral-800 flex w-[280px] max-w-full flex-col px-5 py-5">
                    <div className="self-center flex w-[216px] max-w-full items-start justify-between gap-5">
                        <div className="text-indigo-400 text-base font-medium self-center my-auto">
                            {props.company}
                        </div>
                        <img
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
                            className="aspect-square object-cover object-center w-6 shrink-0"
                        />
                    </div>
                </div>


            ) : (
                <div className="text-zinc-400 text-base ml-6 max-md:ml-2.5">
                    <button onClick={() => props.change(props.company)} className="text-left hover:text-indigo-400 transition-colors">
                        {props.company}
                    </button>
                </div>
            )}
        </div>

    )
}

export default WorkItem