import React, { useEffect, useState } from 'react'
import './NavBar.css'
import navbarLogo from '../assets/DevByAlieu_Navbar.png'

function NavBar({ onNavClick, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const initial = stored === 'dark' || stored === 'light' ? stored : 'light'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (sectionId) => {
    onNavClick(sectionId)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="#home" onClick={() => handleNavClick('home')} className="logo">
            <img 
              src={navbarLogo}
              alt="DevByAlieu" 
              className="navbar-logo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'inline'
              }}
            />
            <span style={{display: 'none'}}>DevByAlieu</span>
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-list">
            {navItems.map((item) => (
              <li key={item.id} className="navbar-item">
                <a
                  href={`#${item.id}`}
                  className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  )
}

export default NavBar
