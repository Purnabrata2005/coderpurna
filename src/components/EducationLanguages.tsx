import React, { useState } from 'react'

export default function EducationLanguages() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true }) // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const educationData = [
    {
      title: "Bachelor's Degree in Computer Science & Engineering",
      school: "Ramkrishna Mahato Government Engineering College",
      date: "2023 - 2027 (Pursuing)",
      location: "Purulia, West Bengal, India",
      bullets: [
        "Pursuing Bachelor of Technology in Computer Science & Engineering.",
        "Studying core computer science subjects including Data Structures, Algorithms, DBMS, and Software Engineering.",
        "Participating in coding competitions and technical events.",
        "Maintaining a good academic record. (Current CGPA: 7.85)"
      ],
      tags: ["CSE", "Data Structures", "Algorithms", "Web Development", "Java"]
    },
    {
      title: "Higher Secondary (Class XII)",
      school: "Bodhra Pantheswari High School",
      date: "04.2021 - 06.2023",
      location: "West Bengal, India",
      bullets: [
        "Completed higher secondary education with 83% marks.",
        "Learned programming fundamentals in C and JavaScript.",
        "Gained an understanding of how applications work and explored various technologies.",
        "Built a strong foundation in problem-solving and logical thinking."
      ],
      tags: ["C", "JavaScript", "Problem Solving", "Application Development Basics", "Self-learning"]
    },
    {
      title: "Secondary Education (Class X)",
      school: "Bodhra Pantheswari High School",
      date: "01.2019 - 03.2021",
      location: "West Bengal, India",
      bullets: [
        "Completed secondary education with 86.5% marks.",
        "Developed interest in computers, mathematics, and science subjects.",
        "Participated in school quiz contests and sports activities."
      ],
      tags: ["Science", "Mathematics", "High School"]
    }
  ]

  return (
    <section className="section education-languages-section">
      <div className="education-languages-grid">
        <div className="education-column">
          <h2 className="section-title">EDUCATION</h2>
          <div className="card education-card">
            {educationData.map((item, index) => (
              <div className="education-item-collapsible" key={index}>
                <div className="education-item-header" onClick={() => toggleItem(index)}>
                  <div className="education-item-icon-wrapper">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="education-item-title-area">
                    <h3 className="education-item-title">{item.title}</h3>
                    <p className="education-item-school">{item.school}</p>
                    <p className="education-item-date">{item.date}</p>
                  </div>
                  <button className="education-item-toggle-btn">
                    <i className={`fas ${openItems[index] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                  </button>
                </div>
                
                {openItems[index] && (
                  <div className="education-item-content">
                    <ul className="education-item-bullets">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="education-item-tags">
                      {item.tags.map((tag, tIdx) => (
                        <span className="education-tag" key={tIdx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
