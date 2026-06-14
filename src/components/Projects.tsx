import React from 'react'

export default function Projects() {
  return (
    <section className="section section-compact" id="projects">
      <div className="creator-showcase">
        <p className="creator-label">Creator of</p>
        <div className="creator-projects-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '450px' }}>
          <div className="creator-item">
            <a
              href="https://coderarena.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-project"
            >
              <img src="/image/coderarena.png" alt="CoderArena" className="creator-logo" width="80" height="80" />
              <span className="creator-name" style={{ fontSize: '2.3rem' }}>
                CoderArena
              </span>
            </a>
            <p className="creator-tagline">
              A comprehensive coding practice, competitive programming, and technical interview preparation platform.
            </p>
            <a
              href="https://coderarena.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-github"
            >
              <i className="fas fa-external-link-alt"></i> Visit coderarena.tech
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
