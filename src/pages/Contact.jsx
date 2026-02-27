import React from 'react'
import { Phone, Mail, MapPin, Clock, MessageSquare, Briefcase, Heart, Star } from 'lucide-react'

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="contact-hero section fade-in">
        <div className="container text-center">
          <span className="label-caps">GET IN TOUCH</span>
          <h1 className="page-title">We'd Love to <span className="italic-accent">Hear from You</span></h1>
          <p className="page-subtitle">For orders, queries, or just to say hello—we reach out across Hyderabad & Telangana.</p>
        </div>
      </section>

      <section className="contact-main section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-panel fade-in">
              <div className="info-card">
                <div className="info-icon"><MapPin size={24} /></div>
                <div className="info-text">
                  <h3>Our Boutique</h3>
                  <p>9th Gokul Plots, KPHB,<br />Hyderabad, Telangana, 500072</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><MessageSquare size={24} /></div>
                <div className="info-text">
                  <h3>Phone / WhatsApp</h3>
                  <p>Primary: 7013886521</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>(Available 9:30 AM – 8:00 PM)</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><Mail size={24} /></div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p>Joyousfoodshyd@gmail.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><Clock size={24} /></div>
                <div className="info-text">
                  <h3>Business Hours</h3>
                  <p>Monday – Sunday</p>
                  <p>9:30 AM – 8:00 PM (Open all 7 days)</p>
                </div>
              </div>
            </div>

            <div className="contact-form-panel fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="form-container">
                <header style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Send an Enquiry</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Fill out the form below and we'll get back to you shortly.</p>
                </header>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="Your Number" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Occasion / Purpose</label>
                    <select>
                      <option>Personal Order</option>
                      <option>Wedding Gifting</option>
                      <option>Corporate Orders</option>
                      <option>Festival Gifting</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message / Special Request</label>
                    <textarea rows="4" placeholder="Tell us more about your requirement..."></textarea>
                  </div>

                  <button type="submit" className="gold-button" style={{ width: '100%', fontSize: '1rem' }}>Send Enquiry →</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <header className="text-center" style={{ marginBottom: '40px' }}>
            <span className="label-caps">FIND US</span>
            <h2 className="section-title">Our Hyderabad Location</h2>
          </header>
          <div className="map-placeholder">
            <div style={{ background: '#f0f0f0', height: '450px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="text-center">
                <MapPin size={48} color="var(--accent-gold)" style={{ marginBottom: '20px' }} />
                <p>Interactive Map Component: KPHB, Hyderabad</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>"Visit us or place your order online — we deliver across Hyderabad & Telangana"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
          background-color: var(--section-bg);
          padding-top: 100px;
        }

        .page-title {
          font-size: 3.5rem;
          color: var(--hero-bg);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
        }

        .info-card {
           display: flex;
           gap: 20px;
           background: white;
           padding: 25px;
           border-radius: 12px;
           box-shadow: 0 5px 20px rgba(0,0,0,0.03);
           border-left: 4px solid var(--accent-gold);
           margin-bottom: 20px;
        }

        .info-icon { color: var(--accent-gold); flex-shrink: 0; }
        .info-text h3 { font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; color: var(--hero-bg); }
        .info-text p { opacity: 0.8; font-size: 0.95rem; }

        .form-container {
          padding: 50px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group { margin-bottom: 25px; }
        .form-group label {
          display: block; font-size: 0.75rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 2px;
          color: var(--hero-bg); margin-bottom: 10px;
        }

        input, select, textarea {
          width: 100%; padding: 14px;
          border: 1px solid rgba(0,0,0,0.05);
          background: #fbfbfb; border-radius: 6px;
          font-family: var(--font-body);
        }

        input:focus, textarea:focus, select:focus {
          border-color: var(--accent-gold); outline: none;
        }

        .section-title { font-size: 2.5rem; }

        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr; }
          .page-title { font-size: 2.8rem; }
        }

        @media (max-width: 600px) {
           .form-row { grid-template-columns: 1fr; }
           .form-container { padding: 30px; }
        }
      `}</style>
    </div>
  )
}

export default Contact
