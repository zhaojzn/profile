import React from 'react'
import chapt from '../../assets/chapt.png'
import z from '../../assets/flicka.png'
import e from '../../assets/wun2free.jpeg'
import d from '../../assets/d.png'
import enc from '../../assets/enc.png'

const items = [
    {
        title: "Chapt",
        description: (
            <>
                Designed and launched a polaroid-style shared photo album to the iOS App Store. Architected a serverless AWS backend with 30+ Lambda functions and 16 DynamoDB tables behind HTTP and WebSocket API Gateways.
            </>
        ),
        image: chapt,
        link: "https://chapt.app",
        skills: ['React Native', 'TypeScript', 'AWS CDK', 'DynamoDB']
    },
    {
        title: "Flicka",
        description: (
            <>
                Built a social photo-sharing app where users post one photo per day to maintain streaks, with real-time sync across iOS and Android.
            </>
        ),
        image: z,
        link: "https://apps.apple.com/ca/app/flicka-flicks/id6753268294",
        skills: ['React Native', 'Firebase', "Tailwind", "TypeScript"]
    },
    {
        title: "Encore",
        description: (
            <>
                Concert companion app integrating the Ticketmaster API to discover local events, track friends' attendance, and share seat locations. Awarded "Most Likely to Become a Startup" at SFU Surge's StormHacks.
            </>
        ),
        image: enc,
        link: "https://devpost.com/software/encore-vzilag",
        skills: ['React Native', 'Firebase', "Tailwind", "TypeScript"]
    },
    {
        title: "Wun2Free Schedule",
        description: (
            <>
                Helped in the development of an employee scheduling website. Implemented custom endpoints for the website using Go and AWS CDK.
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
                Created a Spotify song suggestion app for the employees at Wun2Free. Connected AWS Cognito with the app for authentication.
                <br /><br />
                <b className='text-green-500'><a href='https://open.spotify.com/playlist/1R1gc0amaMvO8mi5yyKmY5?si=9065b3ddc0d046cd'>Press here to view the playlist</a></b>
            </>
        ),
        image: d,
        link: "https://wun2playlist.netlify.app/",
        skills: ['React', "AWS CDK", "Firebase", "TypeScript"]
    },

]

export default items
