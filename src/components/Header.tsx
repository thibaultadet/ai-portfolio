import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-3 py-3 sm:py-4">
        <Link to="/" className="font-semibold text-[var(--sea-ink)] no-underline">
          ai-portfolio
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
