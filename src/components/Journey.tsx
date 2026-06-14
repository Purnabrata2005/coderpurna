import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically load the Leaflet watercolor map component to avoid SSR window issues
const JourneyMap = dynamic(() => import('./JourneyMap'), { ssr: false })

interface JourneyProps {
  timelineRotateY: number
  timelineZIndex: number
  timelineBackZIndex: number
  timelineOverflow: 'hidden' | 'auto'
  handleTimelineItemClick: (country: string) => void
}

export default function Journey({
  timelineRotateY,
  timelineZIndex,
  timelineBackZIndex,
  timelineOverflow,
  handleTimelineItemClick,
}: JourneyProps) {
  return (
    <section className="section journey-section" id="experience">
      <h2 className="section-title-center">My Journey</h2>
      <div className="journey-container">
        {/* Journey Timeline Book Page (Left Page) */}
        <div
          className="journey-timeline"
          style={{
            transform: `rotateY(${timelineRotateY}deg)`,
            zIndex: timelineZIndex,
            overflowY: timelineOverflow,
          }}
        >
          <h3 className="timeline-header">Journey Timeline</h3>
          <div className="timeline-list">
            <div
              className="timeline-item-flat"
              id="exp-1"
              data-country="India"
              onClick={() => handleTimelineItemClick('India')}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">Full-Stack Engineer & Creator @ CoderArena</h4>
                <p className="timeline-date">2026 - Present</p>
                <p className="timeline-description">
                  Built and launched CoderArena, a complete coding practice platform featuring interactive coding challenges,
                  interview preparation paths, structured editorial solutions, and progress analytics. Engineered high-performance 
                  compilers/interpreters and scalable web infrastructure.
                </p>
                <p className="timeline-location">
                  <i className="fas fa-map-marker-alt"></i> Digha, West Bengal, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline Map Cover (Back/Right Page) */}
        <div
          className="journey-timeline-back"
          style={{
            transform: `rotateY(${timelineRotateY}deg)`,
            zIndex: timelineBackZIndex,
          }}
        >
          <svg className="treasure-map-svg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="600" fill="#f4e7d7" />
            <g transform="translate(320, 80)">
              <circle cx="0" cy="0" r="35" fill="none" stroke="#8B4513" strokeWidth="2" />
              <circle cx="0" cy="0" r="30" fill="none" stroke="#8B4513" strokeWidth="1" />
              <polygon points="0,-30 5,-10 -5,-10" fill="#D2691E" />
              <polygon points="0,30 5,10 -5,10" fill="#8B4513" />
              <polygon points="30,0 10,5 10,-5" fill="#8B4513" />
              <polygon points="-30,0 -10,5 -10,-5" fill="#8B4513" />
              <text x="0" y="-40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#8B4513">
                N
              </text>
            </g>
            <path
              d="M 80,150 Q 120,200 100,250 T 140,350 Q 160,400 200,420"
              stroke="#D2691E"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,8"
              strokeLinecap="round"
            />
            <circle cx="80" cy="150" r="8" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <circle cx="100" cy="250" r="8" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <circle cx="140" cy="350" r="8" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <g transform="translate(200, 420)">
              <circle cx="0" cy="0" r="25" fill="#FFD700" opacity="0.3" />
              <line x1="-15" y1="-15" x2="15" y2="15" stroke="#DC143C" strokeWidth="4" strokeLinecap="round" />
              <line x1="15" y1="-15" x2="-15" y2="15" stroke="#DC143C" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g opacity="0.4">
              <polygon points="250,200 270,150 290,200" fill="#8B4513" />
              <polygon points="280,200 300,160 320,200" fill="#A0522D" />
              <polygon points="220,220 245,170 270,220" fill="#8B4513" />
            </g>
            <g opacity="0.4">
              <polygon points="100,450 110,420 120,450" fill="#228B22" />
              <rect x="108" y="450" width="4" height="15" fill="#8B4513" />
              <polygon points="150,480 160,450 170,480" fill="#228B22" />
              <rect x="158" y="480" width="4" height="15" fill="#8B4513" />
              <polygon points="70,500 80,470 90,500" fill="#228B22" />
              <rect x="78" y="500" width="4" height="15" fill="#8B4513" />
            </g>
            <g opacity="0.3">
              <path d="M 40,300 Q 50,295 60,300 T 80,300" stroke="#4682B4" strokeWidth="2" fill="none" />
              <path d="M 40,310 Q 50,305 60,310 T 80,310" stroke="#4682B4" strokeWidth="2" fill="none" />
              <path d="M 280,520 Q 290,515 300,520 T 320,520" stroke="#4682B4" strokeWidth="2" fill="none" />
              <path d="M 280,530 Q 290,525 300,530 T 320,530" stroke="#4682B4" strokeWidth="2" fill="none" />
            </g>
            <rect
              x="10"
              y="10"
              width="380"
              height="580"
              fill="none"
              stroke="#8B4513"
              strokeWidth="3"
              strokeDasharray="10,5"
            />
          </svg>
        </div>

        {/* Journey Map Container (Right Page) */}
        <div className="journey-map-container">
          <JourneyMap />
          <svg className="map-overlay-lines" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#000" strokeWidth="2" opacity="0.8" />
              </pattern>
              <pattern id="scratches" width="200" height="200" patternUnits="userSpaceOnUse">
                <line x1="10" y1="20" x2="60" y2="25" stroke="#000" strokeWidth="2" opacity="0.7" />
                <line x1="100" y1="50" x2="180" y2="48" stroke="#000" strokeWidth="1.5" opacity="0.6" />
                <line x1="30" y1="120" x2="90" y2="115" stroke="#000" strokeWidth="2" opacity="0.7" />
                <line x1="140" y1="160" x2="195" y2="165" stroke="#000" strokeWidth="1.5" opacity="0.6" />
                <line x1="5" y1="180" x2="45" y2="175" stroke="#000" strokeWidth="1.5" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#scratches)" />
          </svg>
          <img src="/image/pirat.png" alt="Pirate" className="map-pirate-overlay" width="200" height="200" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
