import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Instagram, Phone, Mail, MapPin, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import logo from '../assets/joyous_logo_transparent.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()

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

  // Pages with a dark hero section where the navbar should start transparent
  const isLightHero = ['/', '/about'].includes(location.pathname)

  // If we're not on a hero page, always apply the scrolled (dark background) styling
  const forceScrolled = isScrolled || !isLightHero

  return (
    <nav className={`navbar ${forceScrolled ? 'scrolled' : ''} nav-light`}>
      <div className="nav-container">
        <Link to='/' className="navbar-logo-link">
          <div className="navbar-logo-crop">
            <img
              src={logo}
              alt='Joyous Food Factory'
              className="navbar-logo-img"
            />
          </div>
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
          <Link to="/products" className="nav-cart-btn">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>

        {/* Mobile Toggle & Action */}
        <div className="mobile-actions">
          <Link to="/products" className="nav-cart-btn mobile-only">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
              <p><Phone size={16} /> +91 98485 74748</p>
              <p><Mail size={16} /> joyousfoodshyd@gmail.com</p>
            </div>
            <div className="mobile-socials">
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="https://wa.me/919848574748" className="social-icon"><Phone size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
