import React from 'react'
import z from '../../assets/z.png'


const works = [

    {
        name: "Wun2Free",
        location: "Richmond, BC",
        title: "Games Supervisor",
        date: "February 2024 - Present",
        languages: [],
        description: (
            <>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-9 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto max-md:max-w-full">
                        I manage nightly operations for over 20 game booths, ensuring a safe and engaging environment for both guests and staff. I train and
mentor game attendants, monitor site safety, and handle inventory management.

                        </div>
                    </div>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-5">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto">
                        Supervised and trained staff on game operations, customer service, and safety procedures.
                        </div>
                    </div>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto max-md:max-w-full">
                        Resolved customer complaints promptly and professionally.
                        </div>
                    </div>
            </>
        )
    },
    {
        name: "Point Grey Secondary",
        location: "Vancouver, CA",
        title: "Computer Science Peer Tutor",
        date: "January 2021 - July 2021",
        languages: ["Java"],
        
        description: (
            <>
                    <div className="flex w-[450px] max-w-full items-start gap-5 mt-9 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                            Help users with code given by the teacher
                        </div>
                    </div>
                    <div className="flex w-[615px] max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto max-md:max-w-full">
                            Mark assignements and tests for the teacher
                            <br/>
                            and give feedback to the students

                        </div>
                    </div>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-5">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow shrink-0 basis-auto">
                            Leadership skills and communication 
                            <br/>
                            skills are improved through this experience
                        </div>
                    </div>
            </>
        )
    },



]

export default works