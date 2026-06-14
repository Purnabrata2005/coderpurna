import React from 'react'

interface LoaderOverlayProps {
  isLoaderHidden: boolean
}

export default function LoaderOverlay({ isLoaderHidden }: LoaderOverlayProps) {
  return (
    <div className={`loader-overlay ${isLoaderHidden ? 'hidden' : ''}`}>
      <div className="loader-shapes">
        <div className="loader-shape-svg loader-shape-1">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4" />
            <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4" />
            <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="loader-shape-svg loader-shape-2">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4" />
            <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4" />
            <path d="M25 35 L40 50 L25 65" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="50" y1="65" x2="75" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="loader-shape-svg loader-shape-3">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4" />
            <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4" />
            <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" strokeWidth="4" />
            <rect x="30" y="20" width="40" height="20" fill="#66d9ef" stroke="#000" strokeWidth="3" />
            <rect x="35" y="55" width="30" height="15" rx="2" fill="#000" />
            <circle cx="50" cy="35" r="3" fill="#000" />
          </svg>
        </div>
      </div>
      <div className="loader-wrapper">
        <div className="loader-letter">C</div>
        <div className="loader-letter">P</div>
      </div>
      <div className="loader-progress-bar">
        <div className="loader-progress-fill"></div>
      </div>
    </div>
  )
}
