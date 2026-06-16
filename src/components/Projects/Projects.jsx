import React from 'react'
import items from './ProjectList'
import ProjectItem from './ProjectItem'

const Projects = () => {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl px-6 py-28 md:py-40"
    >
      <div className="flex items-center gap-3 text-zinc-400">
        <span className="block h-px w-8 bg-zinc-600" />
        <span className="text-[11px] font-medium uppercase tracking-[0.4em]">portfolio</span>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Personal projects
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          A selection of things I've built — shipped apps, hackathon wins, and side experiments.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((project, index) => (
          <ProjectItem project={project} key={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
