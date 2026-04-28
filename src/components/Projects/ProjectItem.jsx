import React from 'react'
import icons from '../../lib/icons.js'
const ProjectItem = ({ project }) => {
	const { title, description, image, skills, link } = project
	return (
		<div className='flex flex-col rounded-lg border border-neutral-600 border-opacity-50 bg-neutral-800'>
			<a href={link} className="relative h-56 rounded-tl-lg rounded-tr-lg overflow-hidden flex items-center justify-center">
				<img
					className="absolute inset-0 h-full w-full object-cover blur-xl scale-110 opacity-50"
					src={image}
					alt=""
				/>
				<img
					className="relative max-h-full max-w-full object-contain transition duration-100 hover:opacity-80"
					src={image}
					alt="project"
				/>
			</a>
			<div className="flex flex-1 flex-col px-3 pb-4 pt-2 text-white">
				<h1 className="text-center text-2xl font-semibold">{title}</h1>
				<p className="flex-1 border-t border-neutral-700 py-2 text-center">
					{description}
				</p>
				<div className="border-t border-neutral-700" />
				<div className='flex flex-wrap mt-3'>
					{skills.map((skill, index) => (
						<p className="mr-2 mt-2 rounded-lg bg-neutral-500 px-3 pt-1 text-base text-center" key={index}>
							<i className={icons[skill]}/>
							{" " + skill}
						</p>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProjectItem