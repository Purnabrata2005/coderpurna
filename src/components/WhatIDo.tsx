import React from 'react'

export default function WhatIDo() {
  return (
    <section className="section what-i-do-section" id="services">
      <div className="what-i-do-header-container">
        <div className="what-i-do-sticker">What i do?</div>
        {/* Hand-drawn style loop arrow */}
        <svg
          className="what-i-do-arrow"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 20 5 C 20 15, 12 18, 12 25 C 12 32, 28 28, 22 36" />
          <path d="M 16 33 L 22 36 L 24 30" />
        </svg>
      </div>

      <div className="what-i-do-cards-grid">
        {/* Card 1: User Research Design */}
        <div className="what-i-do-card yellow-card">
          <div className="what-i-do-card-badge">Pen/Paper</div>
          <div className="what-i-do-card-icon">
            <i className="fas fa-lightbulb"></i>
          </div>
          <h3 className="what-i-do-card-title">
            Idea<br />Planning
          </h3>
        </div>

        {/* Card 2: UI & Product Design */}
        <div className="what-i-do-card blue-card">
          <div className="what-i-do-card-badge">Code Editor</div>
          <div className="what-i-do-card-icon">
            <i className="fas fa-code"></i>
          </div>
          <h3 className="what-i-do-card-title">
            Development<br />Database Design
          </h3>
        </div>

        {/* Card 3: No-code Development */}
        <div className="what-i-do-card pink-card">
          <div className="what-i-do-card-badge">Web Server</div>
          <div className="what-i-do-card-icon">
            <i className="fas fa-rocket"></i>
          </div>
          <h3 className="what-i-do-card-title">
            Testing<br />Deployment
          </h3>
        </div>
      </div>
    </section>
  )
}
