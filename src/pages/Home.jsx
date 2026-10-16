import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchRuns, fmtDate, fmtKm, fmtPace } from '../lib/runs'
import resume from '../assets/jason_resume.pdf'
import RunningShoe from '../components/RunningShoe'
import ListeningStatus from '../components/ListeningStatus'
import './home.css'

const projects = [
  {
    name: 'Chapt',
    href: 'https://chapt.app',
    description: 'a shared photo album for iOS.',
  },
  {
    name: 'Encore',
    href: 'https://devpost.com/software/encore-vzilag',
    description: 'a concert companion, built at StormHacks.',
  },
  {
    name: 'Wun2Free Schedule',
    href: 'https://github.com/jlui17/W2FHR',
    description: 'employee scheduling software.',
  },
  {
    name: 'Spotify Suggestor',
    href: 'https://wun2playlist.netlify.app/',
    description: 'song suggestions for coworkers.',
  },
]

function LatestRun() {
  const [run, setRun] = useState(null)

  useEffect(() => {
    let active = true
    fetchRuns()
      .then((items) => {
        if (active && items.length) setRun(items[0])
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  if (!run) return null

  return (
    <p className="personal-latest-run">
      Last run:{' '}
      <Link to={`/run/${run.activityId}`}>
        {fmtKm(run.distanceMeters || 0)} at{' '}
        {fmtPace(run.distanceMeters, run.elapsedSeconds)}
      </Link>{' '}
      <span>on {fmtDate(run.startTime)}.</span>
    </p>
  )
}

export default function Home() {
  return (
    <main className="personal-page" id="hello">
      <header className="personal-header">
        <div className="personal-name">
          <h1>Jason Zhao</h1>
          <span className="personal-location">Developer in Vancouver</span>
        </div>
        <a href={resume} target="_blank" rel="noreferrer">
          Résumé ↗
        </a>
      </header>

      <section className="personal-intro" aria-label="About Jason" id="about">
        <p className="personal-lead">
          Building things.
          <br />
          Getting my miles in.
        </p>
      </section>

      <section aria-labelledby="projects-heading" id="work">
        <h2 id="projects-heading">A few projects</h2>
        <dl className="personal-projects">
          {projects.map((project) => (
            <div key={project.name}>
              <dt>
                <a href={project.href} target="_blank" rel="noreferrer">
                  {project.name}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </dt>
              <dd>
                {project.description.charAt(0).toUpperCase() +
                  project.description.slice(1)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="personal-running"
        aria-label="Outside of work"
        id="outside"
      >
        <div className="personal-running-note">
          <p>
            I’m training for my first marathon. The{' '}
            <Link to="/runs">running log</Link> has my miles, pace, heart rate,
            and whatever was in my headphones.
          </p>
          <LatestRun />
        </div>
        <div className="personal-running-shoe">
          <RunningShoe />
        </div>
      </section>

      <ListeningStatus />

      <footer className="personal-footer" id="links">
        <a href="mailto:jason@zhaocs.dev">jason@zhaocs.dev</a>
        <div>
          <a href="https://github.com/zhaojzn" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jason-zhao-bab03b187/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  )
}
