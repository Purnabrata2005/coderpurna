import React from 'react'

interface FooterProps {
  scrollToSection: (secId: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-compact">
        <div className="footer-main">
          <div className="footer-brand-compact">
            <strong>PURNABRATA DEY</strong>
            <span>Full-Stack Engineer</span>
          </div>
          <div className="footer-nav-compact">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('hero')
              }}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('about')
              }}
            >
              About
            </a>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('experience')
              }}
            >
              Experience
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('skills')
              }}
            >
              Skills
            </a>
          </div>
          <div className="footer-social-compact">
            <a href="https://github.com/Purnabrata2005" target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/purnabrata-dey-15018a369"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://x.com/purnabrata2005"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter / X"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a href="mailto:deypurnabrata@gmail.com" title="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom-compact">
          <span>© 2026 Purnabrata Dey</span>
          <a href="/terminal" className="footer-terminal-link-compact">
            <i className="fas fa-terminal"></i> Terminal
          </a>
        </div>
      </div>
    </footer>
  )
}
