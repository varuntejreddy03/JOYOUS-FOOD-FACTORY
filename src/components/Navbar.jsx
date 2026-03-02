import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Instagram, Phone, Mail, MapPin } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  const isLightHero = ['/', '/about'].includes(location.pathname)

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isLightHero ? 'nav-light' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          JOYOUS FOOD FACTORY
          <span className="logo-subtitle label-caps">SILVER BITES</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <div className="mobile-contact-info">
              <p><MapPin size={16} /> KPHB, Hyderabad</p>
              <p><Phone size={16} /> +91 70138 86521</p>
              <p><Mail size={16} /> Joyousfoodshyd@gmail.com</p>
            </div>
            <div className="mobile-socials">
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="https://wa.me/917013886521" className="social-icon"><Phone size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
