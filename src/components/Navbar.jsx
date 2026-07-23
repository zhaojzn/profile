import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import resume from '../assets/jason_resume.pdf'

const links = [
  { label: 'Projects', targetId: '#projects' },
  { label: 'Work', targetId: '#work' },
  { label: 'Runs', to: '/runs' },
  { label: 'Contact', targetId: '#contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scroll = (id) => {
    setOpen(false)
    const element = document.querySelector(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const renderLink = (link, className) =>
    link.to ? (
      <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className={className}>
        {link.label}
      </Link>
    ) : (
      <button key={link.label} onClick={() => scroll(link.targetId)} className={className}>
        {link.label}
      </button>
    )

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
        <button
          onClick={() => scroll('#about')}
          className="text-[15px] font-semibold tracking-tight text-white"
        >
          jason zhao
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) =>
            renderLink(link, 'text-sm text-zinc-400 transition-colors hover:text-white'),
          )}
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/15 px-3.5 py-1.5 text-sm text-white transition-colors hover:border-white/40"
          >
            Resume
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="-mr-1 flex h-9 w-9 items-center justify-center text-white md:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-bg md:hidden">
          <nav className="mx-auto flex w-full max-w-5xl flex-col px-5 py-2">
            {links.map((link) =>
              renderLink(
                link,
                'border-b border-white/[0.06] py-3.5 text-left text-base text-zinc-300 transition-colors last:border-b-0 hover:text-white',
              ),
            )}
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="py-3.5 text-left text-base text-accent"
            >
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
