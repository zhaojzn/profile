import React from 'react'
import icons from '../../lib/icons.js'
const ProjectItem = ({ project }) => {
	const { title, description, image, skills } = project
	return (
		<div className='mx-auto flex h-full w-5/6 flex-col items-center justify-center rounded-lg border border-neutral-600 border-opacity-50 bg-neutral-800 sm:w-96 lg:mx-1'>
			<div className="flex h-full w-full flex-col items-center justify-center">
				<img
					className="h-96 w-full rounded-tl-lg rounded-tr-lg object-cover opacity-100 shadow-2xl transition duration-100 hover:opacity-80"
					src={image}
					alt="project"
				/>
				<div className="flex h-full w-full flex-col px-3 pb-4 pt-2 text-white">
					<h1 className="text-center text-2xl font-semibold">{title}</h1>
					<p className="border-t border-b border-neutral-700 py-2 text-center">
						{description}
					</p>
					<div className="mt-3 flex flex-row content-start justify-start">
					</div>
					<div className='flex flex-wrap'>
						{skills.map((skill, index) => (
							<p className="mr-2 mt-2 rounded-lg bg-neutral-500 px-3 pt-1 text-base text-center ">
							<i className={icons[skill]} />
							{" " + skill}
							</p>
							))}

					</div>


				</div>

			</div>
		</div>
	)
}

export default ProjectItem