import React from 'react'
import icons from '../../lib/icons.js'

const ArrowUpRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
)

const ProjectItem = ({ project }) => {
  const { title, description, image, skills, link } = project
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-neutral-900">
        <img
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-30 blur-2xl scale-110"
          src={image}
          alt=""
        />
        <img
          className="relative max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
          src={image}
          alt={title}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>
        <p className="text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
        <div className="mt-1 flex flex-wrap gap-2 pt-1">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-300"
            >
              {icons[skill] && <i className={icons[skill]} />}
              {skill}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

export default ProjectItem
