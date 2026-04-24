import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import avatarImg from './assets/avatar.png'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [animateHome, setAnimateHome] = useState(false)

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Trigger slide animation when returning to home
    if (sectionId === 'home') {
      setAnimateHome(false)
      // Reset animation by toggling state
      setTimeout(() => {
        setAnimateHome(true)
      }, 50)
    }
  }

  // Initial animation on page load
  useEffect(() => {
    setAnimateHome(true)
  }, [])

  return (
    <div className="app">
      <NavBar onNavClick={scrollToSection} activeSection={activeSection} />
      
      <main className="main-content">
        {/* Home Section - 3D Display */}
        <section id="home" className="section home-section">
          <div className="home-container">
            {/* Left Side - 3D Avatar */}
            <div className="home-avatar animate-fade-in">
              <div className="avatar-container">
                <div className="avatar-glow"></div>
                <img 
                  src={avatarImg}
                  alt="Developer Avatar" 
                  className="avatar-image"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="avatar-placeholder" style={{display: 'none'}}>
                  <span>👤</span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Sliding Text */}
            <div className={`home-content ${animateHome ? 'animate-slide-in' : ''}`}>
              <h1 className={animateHome ? 'animate-slide-in' : ''}>Welcome to My Portfolio</h1>
              <p className={animateHome ? 'animate-slide-in delay-1' : ''}>Hi, I'm a passionate developer creating amazing web experiences</p>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={animateHome ? 'cta-button animate-slide-in delay-2' : 'cta-button'}
              >
                View My Work
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="section-content">
            <h2>About Me</h2>
            <p>I'm a full-stack developer with expertise in React, Node.js, and modern web technologies. I love building user-friendly applications and solving complex problems.</p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div className="section-content">
            <h2>Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Project One</h3>
                <p>A modern web application built with React and Node.js</p>
              </div>
              <div className="project-card">
                <h3>Project Two</h3>
                <p>Full-stack application with real-time features</p>
              </div>
              <div className="project-card">
                <h3>Project Three</h3>
                <p>Mobile-responsive design with stunning animations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills-section">
          <div className="section-content">
            <h2>Skills</h2>
            <div className="skills-grid">
              <div className="skill-item">React</div>
              <div className="skill-item">Node.js</div>
              <div className="skill-item">JavaScript</div>
              <div className="skill-item">CSS</div>
              <div className="skill-item">Web Design</div>
              <div className="skill-item">Responsive Design</div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="section-content">
            <h2>Get In Touch</h2>
            <p>I'd love to hear from you! Feel free to reach out.</p>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
