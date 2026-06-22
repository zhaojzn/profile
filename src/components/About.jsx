import React from 'react'
import { Link } from 'react-router-dom'
import jgo from '../assets/bro.jpg'

// Tabler "run" — a running figure.
const RunningIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="13" cy="4" r="1" />
    <path d="M4 17l5 1l.75 -1.5" />
    <path d="M15 21l0 -4l-4 -3l1 -6" />
    <path d="M7 12l0 -3l5 -1l3 3l3 1" />
  </svg>
)

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

const Sectionlabel = ({ children }) => (
  <div className="flex items-center gap-3 text-zinc-400">
    <span className="block h-px w-8 bg-zinc-600" />
    <span className="text-[11px] font-medium uppercase tracking-[0.4em]">{children}</span>
  </div>
)

const About = () => {
  return (
    <section
      id="about"
      className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 px-6 pt-20 md:flex-row md:items-center md:justify-between md:gap-16 md:pt-32"
    >
      <div className="max-w-xl">
        <Sectionlabel>my name is</Sectionlabel>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
          Jason Zhao
        </h1>
        <p className="mt-6 text-base leading-relaxed text-zinc-300">
          Hey there 👋, I'm Jason Zhao, a 20-year-old student aspiring to become a{' '}
          <span className="font-semibold text-indigo-400">Software Engineer</span>. Ever since I
          was little I've been intrigued by the idea of creating something that can be used by
          millions of people around the world.
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-300">
          Outside of code, I'm currently{' '}
          <span className="font-semibold text-[#fc5200]">training to run my first marathon</span>.
        </p>

        <div className="mt-8">
          <Link
            to="/runs"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.06]"
          >
            <RunningIcon className="h-4 w-4 text-[#fc5200] transition group-hover:scale-110" />
            See my runs
            <span className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-zinc-300">→</span>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-5 text-zinc-300">
          <a
            href="https://www.instagram.com/jason.zhaooo/"
            aria-label="Instagram"
            className="transition hover:text-white"
          >
            <InstagramIcon className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/zhaojzn"
            aria-label="GitHub"
            className="transition hover:text-white"
          >
            <GithubIcon className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/jason-zhao-bab03b187/"
            aria-label="LinkedIn"
            className="transition hover:text-white"
          >
            <LinkedinIcon className="h-6 w-6" />
          </a>
        </div>
      </div>

      <img
        loading="lazy"
        src={jgo}
        alt="Jason Zhao"
        className="aspect-[0.86] w-full max-w-sm rounded-2xl object-cover object-center md:max-w-md"
      />
    </section>
  )
}

export default About
