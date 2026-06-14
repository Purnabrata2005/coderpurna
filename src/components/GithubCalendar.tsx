'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically load to avoid SSR mismatches
const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false }
)

interface GithubCalendarSectionProps {
  activeTheme: string
}

export default function GithubCalendarSection({ activeTheme }: GithubCalendarSectionProps) {
  // Custom slate/vibrant colors to match the user's sketch and neo-brutalist aesthetic
  const customTheme = {
    light: ['#f4f4f7', '#ffd93d', '#a8e6cf', '#66d9ef', '#ff6b9d'],
    dark: ['#202026', '#ffe875', '#a8e6cf', '#66d9ef', '#ff6b9d'],
  }

  return (
    <section className="section github-calendar-section" id="github-activity">
      <h2 className="section-title">GITHUB ACTIVITY</h2>
      <div className="card github-calendar-dashboard">
        
        {/* Left Side: Stats & Info */}
        <div className="github-stats-panel">
          <div className="github-profile-header">
            <i className="fab fa-github github-panel-icon"></i>
            <div>
              <h3 className="github-username">Purnabrata2005</h3>
              <p className="github-subtext">Open Source Developer</p>
            </div>
          </div>
          
          <div className="github-stats-grid">
            <div className="github-stat-item">
              <span className="github-stat-num">800+</span>
              <span className="github-stat-label">Contributions</span>
            </div>
            <div className="github-stat-item">
              <span className="github-stat-num">365+</span>
              <span className="github-stat-label">Days Active</span>
            </div>
          </div>
          
          <a 
            href="https://github.com/Purnabrata2005" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-profile-btn"
          >
            <i className="fas fa-external-link-alt"></i> Follow on GitHub
          </a>
        </div>

        {/* Right Side: The Contribution Calendar Grid */}
        <div className="github-calendar-grid-container">
          <div className="github-calendar-wrapper">
            <GitHubCalendar
              username="Purnabrata2005"
              theme={customTheme}
              colorScheme={activeTheme === 'dark' ? 'dark' : 'light'}
              blockSize={13}
              blockMargin={4}
              fontSize={14}
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
              showWeekdayLabels
            />
          </div>
        </div>

      </div>
    </section>
  )
}
