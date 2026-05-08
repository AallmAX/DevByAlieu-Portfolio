import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import avatarImg from './assets/Profile.svg'
import reactIcon from './assets/icons/react-icon.svg'
import jsIcon from './assets/icons/javascript-icon.svg'
import cssIcon from './assets/icons/css-icon.svg'
import nodeIcon from './assets/icons/nodejs-icon.svg'
import htmlIcon from './assets/icons/html-icon.svg'
import gitIcon from './assets/icons/git-icon.svg'
import emailIcon from './assets/icons/email-icon.svg'
import whatsappIcon from './assets/icons/whatsapp-icon.svg'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [animateHome, setAnimateHome] = useState(false)

  const profile = {
    name: 'Alieu Jallow',
    role: 'SoftwareDeveloper',
    tagline: 'Where genuine design meets smart technology. I craft compelling web and graphic experiences rooted in creativity, with AI and modern tools adding speed and precision to the process.',
    location: 'Based in',
    locationValue: 'The Gambia, West Africa',
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
    const sectionIds = ['home', 'about', 'projects', 'contact']
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
      category: 'Web App',
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
      category: 'Web App',
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
      category: 'Dashboard',
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
      category: 'Tool',
      tech: ['React', 'TypeScript', 'Styled Components'],
      links: {
        live: '#',
        code: '#',
      },
      tint: 'teal',
    },
  ]

  const skills = [
    {
      name: 'React',
      category: 'Frontend',
      proficiency: 70,
      icon: reactIcon
    },
    {
      name: 'JavaScript',
      category: 'Frontend',
      proficiency: 80,
      icon: jsIcon
    },
    {
      name: 'CSS',
      category: 'Frontend',
      proficiency: 90,
      icon: cssIcon
    },
    {
      name: 'Node.js',
      category: 'Backend',
      proficiency: 70,
      icon: nodeIcon
    },
    {
      name: 'HTML',
      category: 'Frontend',
      proficiency: 95,
      icon: htmlIcon
    },
    {
      name: 'Git',
      category: 'Tools',
      proficiency: 65,
      icon: gitIcon
    }
  ]

  const [activeSkillFilter, setActiveSkillFilter] = useState('all')
  const [animatedSkills, setAnimatedSkills] = useState(new Set())

  const filteredSkills = activeSkillFilter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category.toLowerCase() === activeSkillFilter)

  const skillCategories = ['all', ...new Set(skills.map(skill => skill.category.toLowerCase()))]

  // Animate skills on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.dataset.skill
            setAnimatedSkills(prev => new Set([...prev, skillName]))
          }
        })
      },
      { threshold: 0.5 }
    )

    // Use setTimeout to ensure elements are rendered
    const timeoutId = setTimeout(() => {
      const skillElements = document.querySelectorAll('.skill-item')
      skillElements.forEach(el => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, []) // Remove filteredSkills dependency

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
                  className="avatar-image profile-image"
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
              I’m a Software developer and a Graphics Designer focused on building polished, user‑friendly products. I enjoy creating turning ideas into fast,
              responsive interfaces and backing them with reliable APIs and clean architecture.
            </p>

            <div className="highlights-grid">
              <div className="highlight-card glass-card">
                <div className="highlight-title">Frontend</div>
                <div className="highlight-text">React, component systems, CSS, HTML</div>
              </div>
              <div className="highlight-card glass-card">
                <div className="highlight-title">Backend</div>
                <div className="highlight-text">Node.js, auth, databases eg. Supabase Firebase Sql, integrations</div>
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
              A few projects that I have created and participated in, highlighting my approach to clean UI, solid engineering, group coordination and smooth user experience.
            </p>

            <div className="projects-grid">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className={`project-card glass-card ${project.featured ? 'featured' : ''} tint-${project.tint}`}
                >
                  {/* Thumbnail */}
                  <div className="project-thumbnail">
                    <div className="thumbnail-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div className="project-card-header">
                    <span className="project-category">{project.category}</span>
                    {project.featured ? <span className="badge">Featured</span> : null}
                  </div>

                  <div className="project-card-top">
                    <h3>{project.title}</h3>
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
                    <a className="view-code" href={project.links.code} target="_blank" rel="noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      Code
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
            <p className="section-lead">
              Technologies and tools I work with to bring ideas to life, also still improving.
            </p>

            {/* Skill Filters */}
            <div className="skill-filters">
              {skillCategories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeSkillFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveSkillFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-item glass-card"
                  data-skill={skill.name}
                >
                  <div className="skill-header">
                    <div className="skill-icon">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>

                  <div className="skill-progress-container">
                    <div className="skill-progress-bar">
                      <div
                        className="skill-progress-fill"
                        style={{
                          width: `${skill.proficiency}%`
                        }}
                      ></div>
                    </div>
                    <span className="skill-percentage">
                      {skill.proficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="section-content">
            <h2>Contact Me</h2>
            <p className="contact-tagline">Let's create something amazing together.</p>

            <div className="contact-cards">
              {/* Copy Email Card */}
              <button 
                className="contact-card copy-email-card" 
                onClick={() => {
                  navigator.clipboard.writeText('alieujallow@gmail.com')
                  alert('Email copied to clipboard!')
                }}
              >
                <div className="card-icon">
                  <img src={emailIcon} alt="Email icon" />
                </div>
                <div className="card-content">
                  <span className="card-label">Email</span>
                  <span className="card-value">alieu289@gmail.com</span>
                </div>
                <span className="card-action">Click to copy</span>
              </button>

              {/* WhatsApp Card */}
              <a className="contact-card whatsapp-card" href="https://wa.me/220" target="_blank" rel="noreferrer">
                <div className="card-icon whatsapp-icon">
                  <img src={whatsappIcon} alt="WhatsApp icon" />
                </div>
                <div className="card-content">
                  <span className="card-label">WhatsApp</span>
                  <span className="card-value">Start a conversation</span>
                </div>
                <span className="card-action">Chat now →</span>
              </a>
            </div>

            <div className="social-section">
              <h3>Connect With Me</h3>
              <div className="social-cards">
                <a href="https://www.linkedin.com/in/alieu-jallow-127620275?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" className="social-card linkedin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/AallmAX" target="_blank" rel="noreferrer" className="social-card github">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="https://www.instagram.com/deejay_max_gambia?igsh=MXNvdGk0ZXBvY3MwbA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="social-card instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://x.com/aalldj?s=21&t=Xsy5CMrCpRv9wTuVRnQ3_g" target="_blank" rel="noreferrer" className="social-card twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">DevByAlieu</div>
          <div className="footer-meta">© {new Date().getFullYear()} Alieu Jallow. Built with React + Vite.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
