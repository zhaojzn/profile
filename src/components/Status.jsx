import React from 'react'
import Headshot from '../assets/headshot.png'
import resume from '../assets/jason_resume.pdf'

const ContactButton = ({ href, children, primary = false, ...rest }) => (
  <a href={href} {...rest}>
    <span
      className={
        primary
          ? 'inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-zinc-200'
          : 'inline-block rounded-full border border-white/15 bg-transparent px-4 py-1.5 text-sm font-medium text-white transition hover:bg-white/10'
      }
    >
      {children}
    </span>
  </a>
)

const Status = () => {
  return (
    <section id="contact" className="mx-auto w-full max-w-4xl px-6 pb-20 pt-10">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          <img
            className="h-24 w-24 rounded-full border border-white/10 object-cover sm:h-28 sm:w-28"
            src={Headshot}
            alt="Jason Zhao"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-white">Let's connect.</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              If you're interested in working with me or just want to chat, feel free to reach out
              via email or LinkedIn.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              <ContactButton href="mailto:jason@zhaocs.dev">Email</ContactButton>
              <ContactButton
                href="https://www.linkedin.com/in/jason-zhao-bab03b187/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </ContactButton>
              <ContactButton
                href="https://github.com/zhaojzn"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </ContactButton>
              <ContactButton href={resume} target="_blank" rel="noreferrer" primary>
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
