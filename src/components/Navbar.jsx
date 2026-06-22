import React from 'react'
import { Link } from 'react-router-dom'
import resume from '../assets/jason_resume.pdf'

const Navbar = () => {
  const scroll = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const NavButton = ({ targetId, children }) => (
    <button
      onClick={() => scroll(targetId)}
      className="text-sm text-zinc-300 transition hover:text-white"
    >
      {children}
    </button>
  )

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 pt-8">
      <button
        onClick={() => scroll('#about')}
        className="text-sm font-semibold tracking-wide text-white"
      >
        jason zhao
      </button>

      <nav className="flex items-center gap-8">
        <NavButton targetId="#projects">Portfolio</NavButton>
        <NavButton targetId="#work">Experience</NavButton>
        <Link to="/runs" className="text-sm text-zinc-300 transition hover:text-white">Runs</Link>
        <NavButton targetId="#contact">Contact</NavButton>
      </nav>

      <a
        href={resume}
        target="_blank"
        rel="noreferrer"
        className="hidden rounded-md border border-zinc-200/80 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black md:inline-block"
      >
        Resume
      </a>
    </header>
  )
}

export default Navbar
