import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
)

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/joyous_logo_transparent.png" alt="Joyous Food Factory" className="logo-img" style={{ mixBlendMode: 'screen' }} />
            </Link>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '300px', marginTop: '1rem' }}>
              "Crafting moments of pure joy through artisan flavours and Indian tradition."
            </p>
            <div className="social-links" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Instagram"><InstagramIcon /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Facebook"><FacebookIcon /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="YouTube"><YouTubeIcon /></a>
              <a href="https://wa.me/919848574748" target="_blank" rel="noopener noreferrer" className="footer-social-icon whatsapp" title="WhatsApp"><WhatsAppIcon /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
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
            <p><Phone size={18} className="italic-accent" /> 9848574748</p>
            <p><Phone size={18} className="italic-accent" /> 9666255559 <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>(Alternate)</span></p>
            <p><Mail size={18} className="italic-accent" /> joyousfoodshyd@gmail.com</p>
            <p><Clock size={18} className="italic-accent" /> Mon–Sun: 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Silver Bites. All Rights Reserved. | <Link to="#">Privacy Policy</Link> | <Link to="#">Terms of Service</Link></p>
          <p style={{ marginTop: '10px', fontSize: '0.7rem' }}>Authorized Distributor of Andhra Pradesh & Telangana</p>
        </div>
      </div>

      <style>{`
        .footer-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(212,175,55,0.25);
          color: rgba(255,255,255,0.75);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .footer-social-icon:hover {
          background: rgba(212,175,55,0.2);
          border-color: #D4AF37;
          color: #D4AF37;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(212,175,55,0.2);
        }
        .footer-social-icon.whatsapp:hover {
          background: rgba(37,211,102,0.15);
          border-color: #25d366;
          color: #25d366;
          box-shadow: 0 6px 16px rgba(37,211,102,0.2);
        }
      `}</style>
    </footer>
  )
}

export default Footer
