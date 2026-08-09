import React from 'react'
import me from '../assets/me.png'
import resume from '../assets/jason_resume.pdf'

const ContactButton = ({ href, children, primary = false, ...rest }) => (
  <a
    href={href}
    {...rest}
    className={
      primary
        ? 'inline-flex items-center rounded-md border border-accent/50 bg-accent/10 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/20'
        : 'inline-flex items-center rounded-md border border-white/15 px-3.5 py-2 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white'
    }
  >
    {children}
  </a>
)

const Status = () => {
  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-20 px-5 pb-20 pt-6 sm:px-6">
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
          <img
            className="h-20 w-20 shrink-0 rounded-full border border-white/10 object-cover sm:h-24 sm:w-24"
            src={me}
            alt="Jason Zhao"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Get in touch</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Open to internships and side projects. Email is the fastest way to reach me.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              <ContactButton href="mailto:jason@zhaocs.dev">Email</ContactButton>
              <ContactButton href="https://www.linkedin.com/in/jason-zhao-bab03b187/" target="_blank" rel="noreferrer">
                LinkedIn
              </ContactButton>
              <ContactButton href="https://github.com/zhaojzn" target="_blank" rel="noreferrer">
                GitHub
              </ContactButton>
              <ContactButton href={resume} target="_blank" rel="noreferrer">
                Resume
              </ContactButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Status
