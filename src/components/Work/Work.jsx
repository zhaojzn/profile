import React from 'react'
import icons from '../../lib/icons.js'
import WorkList from './WorkList'

const Role = ({ role }) => {
  const { company, location, title, date, languages, bullets } = role
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-[170px_1fr]">
      <div className="md:pt-0.5">
        <div className="font-mono text-xs text-zinc-500">{date}</div>
        <div className="mt-1 text-sm text-zinc-500">{location}</div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="mt-0.5 text-sm text-accent">{company}</div>

        {languages?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
              >
                {icons[skill] && <i className={icons[skill]} />}
                {skill}
              </span>
            ))}
          </div>
        )}

        <ul className="mt-4 flex flex-col gap-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-zinc-400">
              <span className="mt-2.5 h-px w-3 shrink-0 bg-zinc-600" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Work = () => {
  return (
    <section id="work" className="mx-auto w-full max-w-5xl scroll-mt-20 px-5 py-20 sm:px-6 md:py-28">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Work</h2>

      <div className="mt-10 flex flex-col divide-y divide-white/[0.06]">
        {WorkList.map((role, index) => (
          <div key={index} className="py-8 first:pt-0 last:pb-0">
            <Role role={role} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Work
