import React from 'react'
import { Link } from 'react-router-dom'
import Runs from '../components/Runs/Runs'
import Footer from '../components/Footer'

// Standalone /runs page: the running gallery on its own, reached from the
// "See my runs" button in the About section.
export default function RunsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-white antialiased">
      <header className="border-b border-white/5">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-sm font-semibold tracking-wide text-white">
            jason zhao
          </Link>
          <Link to="/" className="text-sm text-zinc-300 transition hover:text-white">
            ← Back home
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Runs />
      </main>
      <Footer />
    </div>
  )
}
