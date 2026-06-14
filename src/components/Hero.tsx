import React from 'react'

interface HeroProps {
  greeting: string
  photoTilted: boolean
  terminalFallen: boolean
  scrollToSection: (secId: string) => void
}

export default function Hero({ greeting, photoTilted, terminalFallen, scrollToSection }: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-greeting" id="hero-greeting">
            {greeting}
          </p>
          <h1 className="hero-name">I'm Purnabrata Dey.</h1>
          <p className="hero-description">
            I'm a Full-Stack Engineer passionate about building scalable, user-friendly software solutions with clean code and creative UI designs. I specialize in developing web applications using Next.js, React, Node.js, and TypeScript.
          </p>
          <div className="hero-social">
            <a href="mailto:deypurnabrata@gmail.com" className="social-btn" title="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://github.com/Purnabrata2005" target="_blank" rel="noopener noreferrer" className="social-btn">
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/purnabrata-dey-15018a369"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://x.com/purnabrata2005"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="Twitter / X"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div className="hero-cta-container">
            <div className="coffee-cta-wrapper">
              <div className="coffee-arrow">
                <span className="coffee-arrow-text">Buy me a coffee</span>
                <img src="/image/arrow.png" alt="arrow" className="coffee-arrow-img" width="140" height="140" />
              </div>
              <a href="" target="_blank" rel="noopener noreferrer" className="btn-coffee">
                <img src="/image/caffe-icon.gif" alt="Coffee" className="coffee-icon-img" width="52" height="52" />
              </a>
            </div>
            <a
              href="#contact"
              className="btn-cta"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
            >
              Get in Touch!
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <div className="tape-sticker"></div>
            <img
              src="/image/avatar.png"
              alt="Purnabrata Dey"
              className={`hero-photo ${photoTilted ? 'tilted' : ''}`}
              width="400"
              height="400"
              style={{ contentVisibility: 'auto' }}
              onMouseEnter={(e) => e.currentTarget.classList.remove('tilted')}
              onMouseLeave={(e) => photoTilted && e.currentTarget.classList.add('tilted')}
            />
            <div className="deco-code">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4" />
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4" />
                <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={`deco-terminal ${terminalFallen ? 'falling' : ''}`}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4" />
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4" />
                <path d="M25 35 L40 50 L25 65" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="50" y1="65" x2="75" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="deco-floppy">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4" />
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4" />
                <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" strokeWidth="4" />
                <rect x="30" y="20" width="40" height="20" fill="#66d9ef" stroke="#000" strokeWidth="3" />
                <rect x="35" y="55" width="30" height="15" rx="2" fill="#000" />
                <circle cx="50" cy="35" r="3" fill="#000" />
              </svg>
            </div>
            <div className="deco-label">CoderPurna</div>
          </div>
        </div>
      </div>
      <div className="tech-badges">
        <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="tech-badge node">
          <i className="devicon-nodejs-plain"></i> Node.js
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="tech-badge react">
          <i className="devicon-react-original"></i> React
        </a>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="tech-badge nextjs">
          <i className="devicon-nextjs-plain"></i> Next.js
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="tech-badge js">
          <i className="devicon-javascript-plain"></i> JavaScript
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="tech-badge html">
          <i className="devicon-html5-plain"></i> HTML
        </a>
        <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="tech-badge ts">
          <i className="devicon-typescript-plain"></i> TypeScript
        </a>
        <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="tech-badge tailwind">
          <i className="devicon-tailwindcss-plain"></i> Tailwind CSS
        </a>
        <a href="https://www.docker.com" target="_blank" rel="noopener noreferrer" className="tech-badge docker">
          <i className="devicon-docker-plain"></i> Docker
        </a>
      </div>
    </section>
  )
}
