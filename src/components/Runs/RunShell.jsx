import { useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../pages/running.css'

export default function RunShell({ children, detail = false }) {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="run-page">
      <header className="run-site-header">
        <Link className="run-brand" to="/">
          Jason Zhao
        </Link>
        <Link className="run-back" to={detail ? '/runs' : '/'}>
          ← {detail ? 'Running log' : 'Back home'}
        </Link>
      </header>
      {children}
      <footer className="run-site-footer">
        <span>© {new Date().getFullYear()} Jason Zhao</span>
        <div>
          <a href="https://www.instagram.com/jason.zhaooo/">Instagram</a>
          <a href="https://github.com/zhaojzn">GitHub</a>
          <a href="https://www.linkedin.com/in/jason-zhao-bab03b187/">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}
