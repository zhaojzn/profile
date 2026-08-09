import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRuns, fmtDate, fmtKm, fmtPace } from '../lib/runs'

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.76 1.28 3.43.98.11-.76.41-1.28.74-1.57-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.17v3.22c0 .31.21.68.8.56C20.21 21.4 23.5 17.09 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
)

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
  </svg>
)

// Latest logged run, pulled live from the same Strava-backed API the /runs
// page uses. Renders nothing until it resolves and stays hidden on failure so
// a slow or down API never leaves a broken placeholder in the hero.
const LatestRun = () => {
  const [run, setRun] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchRuns()
      .then((items) => { if (!cancelled && items.length) setRun(items[0]) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  if (!run) return null

  return (
    <Link
      to={`/run/${run.activityId}`}
      className="group mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-400 transition-colors hover:text-zinc-200"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fc5200] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fc5200]" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Last run</span>
      <span className="font-mono text-xs tabular-nums">
        {fmtDate(run.startTime)} · {fmtKm(run.distanceMeters || 0)} · {fmtPace(run.distanceMeters, run.elapsedSeconds)}
      </span>
      <span className="text-zinc-600 transition-colors group-hover:text-[#fc5200]">→</span>
    </Link>
  )
}

const social = [
  { href: 'https://www.instagram.com/jason.zhaooo/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://github.com/zhaojzn', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://www.linkedin.com/in/jason-zhao-bab03b187/', label: 'LinkedIn', Icon: LinkedinIcon },
]

const About = () => {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 pb-4 pt-16 sm:px-6 md:pt-24"
    >
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
          Jason Zhao
        </h1>
        <p className="mt-6 text-base leading-relaxed text-zinc-300">
          Hey there 👋, I'm Jason Zhao, a 21 year-old student aspiring to become a{' '}
          <span className="font-semibold text-accent">Software Engineer</span>. Ever since I
          was little I've been intrigued by the idea of creating something that can be used by
          millions of people around the world.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-300">
          Outside of code, I'm currently{' '}
          <span className="font-semibold text-[#fc5200]">training to run my first marathon</span>.
        </p>

        <LatestRun />

        <div className="mt-9 flex items-center gap-5 text-zinc-400">
          {social.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition-colors hover:text-white">
              <Icon className="h-[22px] w-[22px]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
