import React from 'react'
import items from './ProjectList'
import ProjectItem from './ProjectItem'

const Projects = () => {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-20 px-5 py-20 sm:px-6 md:py-28">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Projects</h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Apps I've shipped, a couple of hackathon builds, and side experiments.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {items.map((project, index) => (
          <ProjectItem project={project} key={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
