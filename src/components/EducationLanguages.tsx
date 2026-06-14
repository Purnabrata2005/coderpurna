import React from 'react'

export default function EducationLanguages() {
  return (
    <section className="section education-languages-section">
      <div className="education-languages-grid">
        <div className="education-column">
          <h2 className="section-title">EDUCATION</h2>
          <div className="card education-card">
            <div className="education-header">
              <div>
                <h3 className="education-title">Bachelor's Degree in Computer Science & Engineering</h3>
                <p className="education-school">Ramkrishna Mahato Government Engineering College
</p>
              </div>
              <span className="badge">2023-2027(Pursuing)</span>
            </div>
            <p className="education-location">
              <i className="fas fa-map-marker-alt"></i> Purulia, West Bengal, India
            </p>
          </div>
        </div>
        <div className="languages-column">
          <h2 className="section-title">LANGUAGES</h2>
          <div className="card languages-card">
            <div className="language-item">
              <span className="language-name-inline">English</span>
              <div className="language-stars">
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
              </div>
            </div>
            <div className="language-item">
              <span className="language-name-inline">Bengali</span>
              <div className="language-stars">
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
              </div>
            </div>
            <div className="language-item">
              <span className="language-name-inline">Hindi</span>
              <div className="language-stars">
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
