import React from 'react'
import items from './ProjectList'
import ProjectItem from './ProjectItem'
import z from '../../assets/z.png'
const Projects = () => {
	return (
		<div className="self-center flex w-full max-w-[1195px] flex-col mt-32 max-md:max-w-full" id='projects'>
			<div className="self-center flex ml-0 w-[141px] max-w-full items-start gap-4 mt-20">
				<div className="bg-white self-center flex w-4 h-0.5 flex-col my-auto" />
				<div className="text-white text-xs font-medium leading-6 tracking-[8.5px] self-stretch w-[209px]">
					PORTFOLIO
				</div>
			</div>
			<div className="text-white text-4xl font-bold self-center mt-7">
				PERSONAL PROJECTS
			</div>
			<div className="self-center w-full max-w-[1195px] mt-40 px-5 max-md:max-w-full">
				<div className="flex flex-col justify-center gap-2 overflow-hidden p-3 shadow-inner lg:flex-row">

					{items.map((project, index) => (
						<ProjectItem project={project} key={index}/>
					))}
							
					{/* <div className='mx-auto flex h-full w-5/6 flex-col items-center justify-center rounded-lg border border-neutral-600 border-opacity-50 bg-neutral-800 sm:w-96 lg:mx-1'>
						<div className="flex h-full w-full flex-col items-center justify-center">
							<img
								className="h-96 w-full rounded-tl-lg rounded-tr-lg object-cover opacity-100 shadow-2xl transition duration-100 hover:opacity-80"
								src={z}
								alt="project"
							/>
							<div className="flex h-full w-full flex-col px-3 pb-4 pt-2 text-white">
								<h1 className="text-center text-2xl font-semibold">PGSS Chat</h1>
								<p className="border-t border-b border-neutral-700 py-2 text-center">
									Test
								</p>
								<div className="mt-3 flex flex-row content-start justify-start">
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default Projects