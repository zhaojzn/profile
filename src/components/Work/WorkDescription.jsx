import React from 'react'
import icons from '../../lib/icons.js'
const WorkDesciprtion = ({ work }) => {

    const { name, title, location, date, languages, description} = work

    return (
        <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-12 w-full">
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
            {languages && languages.length > 0 && (
                <div className="flex flex-wrap items-start gap-2 mt-6">
                    {languages.map((skill, index) => (
                        <span className="rounded-lg bg-neutral-500 px-3 py-1 text-base text-center text-white inline-flex items-center gap-1.5" key={index}>
                            <i className={icons[skill]} />
                            {skill}
                        </span>
                    ))}
                </div>
            )}
            <div className="bg-zinc-100 w-full max-w-[779px] h-px mt-8 max-md:max-w-full" />
            {description}
        </div>
    )
}

export default WorkDesciprtion