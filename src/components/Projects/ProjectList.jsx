import React from 'react'
import z from '../../assets/z.png'
import e from '../../assets/e.png'
import d from '../../assets/d.png'

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
    {
        title: "Spotify Suggestor",
        description: (
            <>
                Created a Spotify song suggestion app for the employees at working at Wun2Free.
                Connected AWS Cognito with the app to allow users to login and use the app.
                <br/><br/>
                <b className='text-green-500'><a href='https://open.spotify.com/playlist/1R1gc0amaMvO8mi5yyKmY5?si=9065b3ddc0d046cd'>Press here to view the playlist</a></b>
                <br/><br/>
            </>
          ),
        image: d,
        link: "https://wun2playlist.netlify.app/",
        skills: ['React', "AWS CDK", "Firebase", "TypeScript"]
    },  

]

export default items