import React from 'react'
import z from '../../assets/z.png'
import e from '../../assets/e.png'


const items = [
    {
        title: "PGSS Chat",
        description: (
            <>
                My first ever project was a highschool project.
                Initiated and completed my first independent web development project using Google Firebase and React JS. 
            </>
          ),
        image: z,
        link: "https://github.com/zhaojzn/pg-chat",
        skills: ['React', 'Firebase', "Tailwind"]
    },
    {
        title: "Wun2Free Schedule",
        description: (
            <>
                Helped in the development of a employee scheduling website.
                Implemented custom endpoints for the website using Go and AWS CDK. 
            </>
          ),
        image: e,
        link: "https://github.com/jlui17/W2FHR",
        skills: ['React', 'Go', "AWS CDK"]
    },  

]

export default items