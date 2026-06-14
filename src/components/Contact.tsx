import React from 'react'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <h2 className="section-title">GET IN TOUCH</h2>
      <div className="contact-container-compact">
        <p className="contact-intro">Let's build something amazing together</p>
        <div className="contact-grid">
          <a
            href="https://linkedin.com/in/purnabrata-dey-15018a369"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/Purnabrata2005" target="_blank" rel="noopener noreferrer" className="contact-card">
            <i className="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a
            href="https://x.com/purnabrata2005"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <i className="fab fa-twitter"></i>
            <span>Twitter / X</span>
          </a>
        </div>
      </div>
    </section>
  )
}
