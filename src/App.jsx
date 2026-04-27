import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import avatarImg from './assets/avatar.png'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [animateHome, setAnimateHome] = useState(false)

  const profile = {
    name: 'Alieu Jallow',
    role: 'Full‑Stack Developer',
    tagline: 'I build fast, modern web apps with clean UI, smooth UX, and reliable code.',
    location: 'Based in',
    locationValue: 'The Gambia',
  }

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

  // Track active section while scrolling
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'skills', 'contact']
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        root: null,
        // Slightly below the navbar so sections count as "active" when content is visible.
        rootMargin: '-80px 0px -55% 0px',
        threshold: [0.12, 0.2, 0.35, 0.5, 0.65],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: 'E‑Commerce Platform',
      description: 'A full‑stack shopping experience with cart flow, checkout, and product management.',
      tech: ['React', 'Node.js', 'MongoDB'],
      links: {
        live: '#',
        code: '#',
      },
      featured: true,
      tint: 'violet',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task tracker with real‑time updates, teams, and activity history.',
      tech: ['React', 'Firebase', 'Tailwind'],
      links: {
        live: '#',
        code: '#',
      },
      tint: 'cyan',
    },
    {
      title: 'Weather Dashboard',
      description: 'Real‑time weather with forecasts, search, and location‑based results.',
      tech: ['JavaScript', 'API Integration', 'CSS'],
      links: {
        live: '#',
        code: '#',
      },
      tint: 'amber',
    },
    {
      title: 'Portfolio Generator',
      description: 'A dynamic portfolio builder with customizable templates and quick publishing.',
      tech: ['React', 'TypeScript', 'Styled Components'],
      links: {
        live: '#',
        code: '#',
      },
      tint: 'teal',
    },
  ]

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
              <p className={animateHome ? 'home-kicker animate-slide-in delay-1' : 'home-kicker'}>
                {profile.location} <span className="home-kicker-strong">{profile.locationValue}</span>
              </p>
              <h1 className={animateHome ? 'animate-slide-in' : ''}>
                {profile.name}
                <span className="home-title-accent"> — {profile.role}</span>
              </h1>
              <p className={animateHome ? 'animate-slide-in delay-1' : ''}>{profile.tagline}</p>
              <div className={animateHome ? 'home-cta-row animate-slide-in delay-2' : 'home-cta-row'}>
                <button onClick={() => scrollToSection('projects')} className="cta-button">
                  View Projects
                </button>
                <button onClick={() => scrollToSection('contact')} className="cta-button secondary">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="section-content">
            <h2>About Me</h2>
            <p>
              I’m a full‑stack developer focused on building polished, user‑friendly products. I enjoy turning ideas into fast,
              responsive interfaces and backing them with reliable APIs and clean architecture.
            </p>

            <div className="highlights-grid">
              <div className="highlight-card glass-card">
                <div className="highlight-title">Frontend</div>
                <div className="highlight-text">React, component systems, responsive layouts, accessible UI</div>
              </div>
              <div className="highlight-card glass-card">
                <div className="highlight-title">Backend</div>
                <div className="highlight-text">Node.js, REST APIs, auth, databases, integrations</div>
              </div>
              <div className="highlight-card glass-card">
                <div className="highlight-title">Delivery</div>
                <div className="highlight-text">Performance, clean code, maintainability, great UX details</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div className="section-content">
            <h2>Featured Projects</h2>
            <p className="section-lead">
              A few projects that highlight my approach to clean UI, solid engineering, and smooth user experience.
            </p>

            <div className="projects-grid">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className={`project-card glass-card ${project.featured ? 'featured' : ''} tint-${project.tint}`}
                >
                  <div className="project-card-top">
                    <h3>{project.title}</h3>
                    {project.featured ? <span className="badge">Featured</span> : null}
                  </div>
                  <p>{project.description}</p>

                  <div className="tech-chips">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a className="view-project" href={project.links.live} target="_blank" rel="noreferrer">
                      View Project
                      <span className="view-project-icon" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills-section">
          <div className="section-content">
            <h2>Skills</h2>
            <div className="skills-grid">
              {['React', 'Node.js', 'JavaScript', 'CSS', 'Web Design', 'Responsive Design'].map((skill) => (
                <div key={skill} className="skill-item glass-card">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="section-content">
            <h2>Contact Me</h2>
            <p>Tell me about your next project.</p>

            <div className="contact-links">
              <button 
                className="contact-link copy-email-btn" 
                onClick={() => {
                  navigator.clipboard.writeText('alieujallow@gmail.com')
                  alert('Email copied to clipboard!')
                }}
              >
                <span className="copy-icon">📋</span>
                Copy Email
              </button>
              <a className="contact-link whatsapp-link" href="https://wa.me/220" target="_blank" rel="noreferrer">
                <span className="whatsapp-icon">💬</span>
                WhatsApp
              </a>
            </div>

            <div className="contact-social-media">
              <h3>Social Media</h3>
              <ul>
                <li><a href="https://linkedin.com/in/" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
                <li><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a></li>
                <li><a href="https://dribbble.com/" target="_blank" rel="noreferrer">Dribbble ↗</a></li>
                <li><a href="https://gitlab.com/" target="_blank" rel="noreferrer">GitLab ↗</a></li>
              </ul>
            </div>

            <div className="contact-write-me">
              <h3>Write Me & We'll Talk</h3>
              <ul>
                <li><a href="https://wa.me/220" target="_blank" rel="noreferrer">WhatsApp ↗</a></li>
                <li><a href="https://m.me/" target="_blank" rel="noreferrer">Messenger ↗</a></li>
                <li><a href="https://t.me/" target="_blank" rel="noreferrer">Telegram ↗</a></li>
                <li><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a></li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">DevByAlieu</div>
            <div className="footer-meta">© {new Date().getFullYear()} Alieu Jallow. Built with React + Vite.</div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
