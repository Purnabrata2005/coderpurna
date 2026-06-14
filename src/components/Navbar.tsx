import React from 'react'

interface NavbarProps {
  activeSection: string
  isNavbarHidden: boolean
  activeTheme: string
  handleThemeToggle: () => void
  scrollToSection: (secId: string) => void
}

export default function Navbar({
  activeSection,
  isNavbarHidden,
  activeTheme,
  handleThemeToggle,
  scrollToSection,
}: NavbarProps) {
  return (
    <nav className={`navbar ${isNavbarHidden ? 'navbar-hidden' : ''}`}>
      <div className="nav-content">
        <a href="#" className="nav-brand">
          CP
        </a>
        <div className="nav-links-center">
          <a
            href="#hero"
            className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('hero')
            }}
          >
            Home
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('about')
            }}
          >
            About
          </a>
          <a
            href="#experience"
            className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('experience')
            }}
          >
            Journey
          </a>
          <a
            href="#skills"
            className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('skills')
            }}
          >
            Skills
          </a>
        </div>
        <div className="nav-right">
          <a
            href="https://coderarena.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-coderarena"
            title="CoderArena - Coding Platform"
          >
            <img src="/image/coderarena.png" alt="CoderArena" className="coderarena-logo" width="28" height="28" style={{ borderRadius: '4px' }} />
            <span className="nav-coderarena-text">CoderArena</span>
          </a>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('contact')
            }}
          >
            Get in Touch!
          </a>
          <button id="theme-toggle" className="theme-toggle-nav" aria-label="Toggle theme" onClick={handleThemeToggle}>
            <i className={`fas ${activeTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  )
}
