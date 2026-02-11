import React from 'react'
import { useState } from 'react';
import WorkItem from './WorkItem';
import WorkList from './WorkList';
import WorkDesciprtion from './WorkDescription';
const Work = (props) => {

  const [currentCompany, setCurrentCompany] = useState('Wun2Free');

  const handleCompanyChange = (company) => {
    setCurrentCompany(company);
  };

  return (
    <div className="bg-bg self-stretch flex flex-col ml-0.5 mt-44 px-5 py-10 max-md:max-w-full" id='work'>
      <div className="self-center ml-0 w-full max-w-[1204px] mt-20 mb-16 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[29%] max-md:w-full">
            <div className="flex grow flex-col max-md:mt-12">
              <div className="flex w-[186px] max-w-full items-start gap-4">
                <div className="bg-zinc-300 self-center flex w-4 h-0.5 flex-col my-auto" />
                <div className="text-zinc-500 text-xs font-medium leading-6 tracking-[7.5px] uppercase self-stretch">
                  career path
                </div>
              </div>
              <div className="text-white text-4xl font-bold mt-7">
                Work Experiences 
              </div>

              {WorkList.map((company, index) => (
                <WorkItem company={company.name} change={setCurrentCompany} currentCompany={currentCompany} key={index} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-stretch w-[71%] ml-5 max-md:w-full min-w-0">
            {WorkList.map((company, index) => (
              currentCompany === company.name ? (
                <WorkDesciprtion work={company} key={index} />
              ) : null
            ))}
          </div>
          {/* <div className="flex flex-col items-stretch w-[71%] ml-5 max-md:w-full">
            <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-12">
              <div className="text-white text-lg font-medium underline max-w-[418px]">
                Front-end Developer Apple .Inc
                <br />
              </div>
              <div className="text-zinc-500 text-sm mt-3.5">
                California, United States
              </div>
              <div className="text-zinc-500 text-sm font-medium leading-6 w-[337px] max-w-full mt-3.5">
                Nov 2020 - Present · Full-time
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
                  Collaborate with back-end developers and web designers to
                  improve usability
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
                  Developing an admin panel to manage contents, users,
                  products and ...
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Work