import React from 'react'

interface ProgressBarProps {
  scrollProgress: number
  activeSection: string
  scrollToSection: (secId: string) => void
}

export default function ProgressBar({ scrollProgress, activeSection, scrollToSection }: ProgressBarProps) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${scrollProgress}%` }}></div>
      <div className="progress-checkpoints">
        <div className={`checkpoint ${activeSection === 'hero' ? 'active' : ''}`} onClick={() => scrollToSection('hero')}>
          <div className="checkpoint-dot"></div>
          <span className="checkpoint-label">Home</span>
        </div>
        <div className={`checkpoint ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>
          <div className="checkpoint-dot"></div>
          <span className="checkpoint-label">About</span>
        </div>
        <div className={`checkpoint ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => scrollToSection('experience')}>
          <div className="checkpoint-dot"></div>
          <span className="checkpoint-label">Journey</span>
        </div>
        <div className={`checkpoint ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => scrollToSection('skills')}>
          <div className="checkpoint-dot"></div>
          <span className="checkpoint-label">Skills</span>
        </div>
        <div className={`checkpoint ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>
          <div className="checkpoint-dot"></div>
          <span className="checkpoint-label">Contact</span>
        </div>
      </div>
    </div>
  )
}
