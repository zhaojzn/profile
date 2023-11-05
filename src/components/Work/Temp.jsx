import React, { useState } from 'react';

const Work = () => {
  const [currentCompany, setCurrentCompany] = useState('Apple');

  const handleCompanyChange = (company) => {
    setCurrentCompany(company);
  };

  return (
    <div className="bg-bg self-stretch flex flex-col ml-0.5 mt-44 px-5 py-10 max-md:max-w-full" id='work'>
      {/* Add navigation buttons */}
      <div className="flex justify-center mb-4">
        <button onClick={() => handleCompanyChange('Apple')} className={`px-4 py-2 mx-2 rounded ${currentCompany === 'Apple' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>Apple</button>
        <button onClick={() => handleCompanyChange('Microsoft')} className={`px-4 py-2 mx-2 rounded ${currentCompany === 'Microsoft' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>Microsoft</button>
        <button onClick={() => handleCompanyChange('Facebook')} className={`px-4 py-2 mx-2 rounded ${currentCompany === 'Facebook' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>Facebook</button>
        <button onClick={() => handleCompanyChange('Slack')} className={`px-4 py-2 mx-2 rounded ${currentCompany === 'Slack' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>Slack</button>
      </div>

      {/* Placeholder content for work experiences */}
      {currentCompany === 'Apple' && (
        <div className="self-center ml-0 w-full max-w-[1204px] mt-20 mb-16 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[29%] max-md:w-full">
              <div className="flex grow flex-col max-md:mt-12">
                <div className="flex w-[186px] max-w-full items-start gap-4">
                  <div className="bg-zinc-300 self-center flex w-4 h-0.5 flex-col my-auto" />
                  <div className="text-zinc-500 text-xs font-medium leading-6 tracking-[7.5px] uppercase self-stretch">
                    Career Path
                  </div>
                </div>
                <div className="text-white text-4xl font-bold mt-7">
                  Front-end Developer at Apple Inc.
                </div>
                <div className="justify-between items-center rounded bg-neutral-800 flex w-[280px] max-w-full flex-col mt-20 px-5 py-3.5">
                  <div className="self-center flex w-[216px] max-w-full items-start justify-between gap-5">
                    <div className="text-indigo-400 text-base font-medium self-center my-auto">
                      Apple
                    </div>
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
                      className="aspect-square object-cover object-center w-6 shrink-0"
                    />
                  </div>
                </div>
                <div className="text-white text-base ml-6 mt-10 max-md:ml-2.5">
                  Location: Cupertino, California
                </div>
                <div className="text-white text-base ml-6 mt-9 max-md:ml-2.5">
                  Employment Type: Full-time
                </div>
                <div className="text-white text-base ml-6 mt-9 max-md:ml-2.5">
                  Period: Nov 2020 - Present
                </div>
                <div className="flex w-[95px] max-w-full items-start gap-4 mt-6">
                  <div className="text-zinc-500 text-xs font-medium self-stretch items-start rounded border border-[color:var(--Light-2,#F1F1F1)] w-[46px] max-w-full px-2 py-1 border-solid">
                    Swift
                  </div>
                  <div className="text-zinc-500 text-xs font-medium self-stretch items-start rounded border border-[color:var(--Light-2,#F1F1F1)] w-[33px] max-w-full px-2 py-1 border-solid">
                    Go
                  </div>
                </div>
                <div className="bg-zinc-100 w-[779px] h-px mt-8 max-md:max-w-full" />
                <div className="flex w-[450px] max-w-full items-start gap-5 mt-9 max-md:flex-wrap">
                  <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                  <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                    Improving overall website performance for mobile users.
                  </div>
                </div>
                <div className="flex w-[615px] max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                  <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                  <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                    Collaborate with back-end developers and web designers to improve usability.
                  </div>
                </div>
                <div className="flex w-[333px] max-w-full items-start gap-5 mt-5">
                  <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                  <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto">
                    Add voice search feature for mobile app.
                  </div>
                </div>
                <div className="flex w-[561px] max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                  <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                  <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                    Developing an admin panel to manage contents, users, products and more.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentCompany === 'Microsoft' && (
        <div className="self-center ml-0 w-full max-w-[1204px] mt-20 mb-16 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[29%] max-md:w-full">
            <div className="flex grow flex-col max-md:mt-12">
              <div className="flex w-[186px] max-w-full items-start gap-4">
                <div className="bg-zinc-300 self-center flex w-4 h-0.5 flex-col my-auto" />
                <div className="text-zinc-500 text-xs font-medium leading-6 tracking-[7.5px] uppercase self-stretch">
                  Career Path
                </div>
              </div>
              <div className="text-white text-4xl font-bold mt-7">
                Front-end Developer at Apple Inc.
              </div>
              <div className="justify-between items-center rounded bg-neutral-800 flex w-[280px] max-w-full flex-col mt-20 px-5 py-3.5">
                <div className="self-center flex w-[216px] max-w-full items-start justify-between gap-5">
                  <div className="text-indigo-400 text-base font-medium self-center my-auto">
                    Apple
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e25b52cf-ad1a-478f-aaea-38a362bae07b?apiKey=62cc1c00d0454fed8ec6b8f31dfdb7b5&"
                    className="aspect-square object-cover object-center w-6 shrink-0"
                  />
                </div>
              </div>
              <div className="text-white text-base ml-6 mt-10 max-md:ml-2.5">
                Location: Cupertino, California
              </div>
              <div className="text-white text-base ml-6 mt-9 max-md:ml-2.5">
                Employment Type: Full-time
              </div>
              <div className="text-white text-base ml-6 mt-9 max-md:ml-2.5">
                Period: Nov 2020 - Present
              </div>
              <div className="flex w-[95px] max-w-full items-start gap-4 mt-6">
                <div className="text-zinc-500 text-xs font-medium self-stretch items-start rounded border border-[color:var(--Light-2,#F1F1F1)] w-[46px] max-w-full px-2 py-1 border-solid">
                  Swift
                </div>
                <div className="text-zinc-500 text-xs font-medium self-stretch items-start rounded border border-[color:var(--Light-2,#F1F1F1)] w-[33px] max-w-full px-2 py-1 border-solid">
                  Go
                </div>
              </div>
              <div className="bg-zinc-100 w-[779px] h-px mt-8 max-md:max-w-full" />
              <div className="flex w-[450px] max-w-full items-start gap-5 mt-9 max-md:flex-wrap">
                <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                  Improving overall website performance for mobile users.
                </div>
              </div>
              <div className="flex w-[615px] max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                  Collaborate with back-end developers and web designers to improve usability.
                </div>
              </div>
              <div className="flex w-[333px] max-w-full items-start gap-5 mt-5">
                <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto">
                  Add voice search feature for mobile app.
                </div>
              </div>
              <div className="flex w-[561px] max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                  Developing an admin panel to manage contents, users, products and more.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {currentCompany === 'Facebook' && (
        <div className="self-center ml-0 w-full max-w-[1204px] mt-20 mb-16 max-md:max-w-full">
          {/* Placeholder content for Facebook */}
        </div>
      )}

      {currentCompany === 'Slack' && (
        <div className="self-center ml-0 w-full max-w-[1204px] mt-20 mb-16 max-md:max-w-full">
          {/* Placeholder content for Slack */}
        </div>
      )}
    </div>
  );
}

export default Work;
