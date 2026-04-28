import React from 'react'

const works = [
    {
        name: "Wun2Free",
        location: "Richmond, BC",
        title: "Software Developer",
        date: "February 2024 - Present",
        languages: ["React", "TypeScript", "AWS CDK"],
        description: (
            <>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-9 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto max-md:max-w-full">
                        Built a user authentication API with AWS Cognito, implementing registration and login flows that serve 150+ active users with secure session management.
                        </div>
                    </div>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-5">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto">
                        Designed and deployed serverless microservices using AWS Lambda and API Gateway, reducing infrastructure costs and enabling auto-scaling for production workloads.
                        </div>
                    </div>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto max-md:max-w-full">
                        Developed RESTful API endpoints with Node.js and Express, integrating with front-end applications to support core product features.
                        </div>
                    </div>
            </>
        )
    },
    {
        name: "Point Grey Secondary",
        location: "Vancouver, BC",
        title: "Computer Science Peer Tutor",
        date: "September 2021 - July 2022",
        languages: ["Java"],
        description: (
            <>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-9 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto max-md:max-w-full">
                        Tutored 30+ students in introductory Java programming, reinforcing data structures, control flow, and object-oriented design concepts.
                        </div>
                    </div>
                    <div className="flex w-3/4 max-w-full items-start gap-5 mt-5 max-md:flex-wrap">
                        <div className="bg-zinc-300 self-center flex w-2.5 h-0.5 flex-col my-auto" />
                        <div className="text-zinc-500 text-base self-stretch grow basis-auto max-md:max-w-full">
                        Graded 100+ assignments and tests alongside the instructor, delivering targeted feedback that improved student code quality and debugging skills.
                        </div>
                    </div>
            </>
        )
    },
]

export default works