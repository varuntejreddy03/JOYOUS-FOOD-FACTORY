import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">JOYOUS FOOD FACTORY</Link>
            <p className="label-caps" style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Silver Bites</p>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '300px' }}>
              "Crafting moments of pure joy through artisan flavours and Indian tradition."
            </p>
            <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
              <a href="#" className="nav-link"><Instagram size={20} /></a>
              <a href="#" className="nav-link"><Facebook size={20} /></a>
              <a href="#" className="nav-link"><Linkedin size={20} /></a>
              <a href="https://wa.me/917013886521" className="nav-link"><Phone size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/gifting">Gifting</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Our Flavours</h4>
            <ul>
              <li><Link to="/products">Original Chocolate</Link></li>
              <li><Link to="/products">Rose Gulkand</Link></li>
              <li><Link to="/products">Kesar Badam</Link></li>
              <li><Link to="/products">Pistachio Delight</Link></li>
              <li><Link to="/products">Mango Fusion</Link></li>
              <li><Link to="/products">Vanilla Choco Beeda</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact</h4>
            <p><MapPin size={18} className="italic-accent" /> 9th Gokul Plots, KPHB, Hyderabad</p>
            <p><Phone size={18} className="italic-accent" /> 7013886521</p>
            <p><Mail size={18} className="italic-accent" /> Joyousfoodshyd@gmail.com</p>
            <p><Clock size={18} className="italic-accent" /> Mon–Sun: 9:30 AM – 8:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Joyous Food Factory. All Rights Reserved. | <Link to="#">Privacy Policy</Link> | <Link to="#">Terms of Service</Link></p>
          <p style={{ marginTop: '10px', fontSize: '0.7rem' }}>Authorized Distributor of Telangana</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
