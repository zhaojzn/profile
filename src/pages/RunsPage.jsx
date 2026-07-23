import React from 'react'
import { Link } from 'react-router-dom'
import Runs from '../components/Runs/Runs'
import Footer from '../components/Footer'

// Standalone /runs page: the running gallery on its own, reached from the
// "See my runs" button in the About section.
export default function RunsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-white antialiased">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
          <Link to="/" className="text-[15px] font-semibold tracking-tight text-white">
            jason zhao
          </Link>
          <Link to="/" className="text-sm text-zinc-400 transition-colors hover:text-white">
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
