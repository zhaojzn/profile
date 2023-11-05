import React from 'react'
import icons from '../../lib/icons.js'
const WorkDesciprtion = ({ work }) => {

    const { name, title, location, date, languages, description} = work

    return (
        <div>
            <div className="flex flex-col items-stretch w-[71%] ml-5 max-md:w-full">
                <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-12">
                    <div className="text-white text-lg font-medium underline max-w-[418px]">
                        {title}
                        <br />
                    </div>
                    <div className="text-zinc-500 text-sm mt-3.5">
                        {location}
                    </div>
                    <div className="text-zinc-500 text-sm font-medium leading-6 w-[337px] max-w-full mt-3.5">
                        {date}
                    </div>
                    <div className="flex w-[95px] max-w-full items-start gap-4 mt-6">
                        <div className='flex flex-wra text-white'>
                            {languages.map((skill, index) => (
                                <p className="mr-2 mt-2 rounded-lg bg-neutral-500 px-3 pt-1 text-base text-center " key={index}>
                                <i className={icons[skill]}/>
                                {" " + skill}
                                </p>
                                ))}

                        </div>
                    </div>

                    <div className="bg-zinc-100 w-[779px] h-px mt-8 max-md:max-w-full" />
                    {description}
                </div>
            </div>
        </div>

    )
}

export default WorkDesciprtion