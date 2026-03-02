import React from 'react'
import FlavorsStrip from '../components/FlavorsStrip'

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="diagonal-texture"></div>
        <div className="container hero-grid">
          <div className="hero-text fade-in">
            <div className="gold-rule"></div>
            <span className="label-caps italic-accent">Est. 2020</span>
            <h1 className="hero-h1">Blending Tradition <br /> with <span className="italic-accent">Modern Elegance</span></h1>
            <p className="hero-p">Handcrafted Chocolate Beedas — where the age-old magic of Indian pan meets the richness of premium chocolate. Made fresh in Hyderabad, delivered across Telangana.</p>
            <div className="hero-actions">
              <a href="/products" className="gold-button">Explore Our Flavours</a>
              <a href="/gifting" className="outline-button">Corporate Gifting Enquiry</a>
            </div>
          </div>
          <div className="hero-image-container fade-in">
            <img
              src="/assets/hero-product.png"
              alt="Geometric chocolate beedas"
              className="hero-img float-anim"
            />
          </div>
        </div>
      </section>

      {/* Flavors Strip Section */}
      <section className="flavors-strip-container" style={{ paddingTop: '80px', backgroundColor: 'var(--section-bg)' }}>
        <div className="container text-center">
          <h2 className="section-title">Our Signature Chocolate Beeda Flavours</h2>
          <p className="page-subtitle" style={{ marginBottom: '40px', opacity: 0.7 }}>Each piece handcrafted fresh — packed with tradition, bursting with flavour.</p>
        </div>
        <FlavorsStrip />
        <div className="container text-center" style={{ marginTop: '30px' }}>
          <p className="italic-accent">✦ Flavours are Customizable for Bulk & Corporate Orders</p>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="legacy section">
        <div className="container legacy-grid">
          <div className="legacy-text">
            <span className="label-caps">OUR STORY</span>
            <h2 className="section-title">A Legacy of Taste, Reimagined</h2>
            <p>At Joyous Food Factory, we believe that some of India's finest flavours deserve a modern stage. Our Chocolate Beeda is born from that belief — taking the beloved tradition of sweet pan and wrapping it in the finest chocolate shell.</p>
            <p>Every bite carries the warmth of rose petals, the crunch of fresh pistachios, the aroma of saffron, and the richness of premium chocolate — all crafted by hand, every single day, right here in Hyderabad.</p>
            <a href="/about" className="learn-more">Read Our Full Story →</a>
          </div>
          <div className="legacy-image-frame">
            <img
              src="/assets/legacy-product.png"
              alt="Cut open chocolate beeda"
              className="legacy-img"
            />
            <div className="gold-border-accent"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <header className="text-center fade-in">
            <h2 className="section-title">Why Hyderabad Loves Silver Bites</h2>
          </header>

          <div className="tiles-grid">
            <div className="tile fade-in">
              <span className="tile-icon">🍫</span>
              <h3>100% Handcrafted</h3>
              <p>Every beeda made fresh by hand — no machines, no shortcuts.</p>
            </div>
            <div className="tile fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="tile-icon">🌿</span>
              <h3>Premium Ingredients</h3>
              <p>Real saffron, fresh pistachios, pure rose gulkand — nothing artificial.</p>
            </div>
            <div className="tile fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="tile-icon">🎁</span>
              <h3>Gift-Ready Packaging</h3>
              <p>Elegant boxes perfect for weddings, festivals, and corporate gifting.</p>
            </div>
            <div className="tile fade-in" style={{ animationDelay: '0.3s' }}>
              <span className="tile-icon">⚙️</span>
              <h3>Fully Customizable</h3>
              <p>Choose your flavours, box size, and branding for bulk orders.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          height: 100vh;
          min-height: 800px;
          background-color: var(--hero-bg);
          display: flex;
          align-items: center;
          position: relative;
          color: var(--text-primary);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .gold-rule {
          width: 60px;
          height: 2px;
          background: var(--accent-gold);
          margin-bottom: 2rem;
        }

        .hero-h1 {
          font-size: 4.5rem;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 2rem;
        }

        .hero-p {
          font-size: 1.2rem;
          max-width: 500px;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
        }

        .hero-img {
          width: 100%;
          filter: drop-shadow(0 20px 50px rgba(214, 0, 141, 0.4));
        }

        .legacy { background-color: var(--section-bg); }

        .legacy-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 100px;
          align-items: center;
        }

        .legacy-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-title {
           font-size: 3rem;
           margin-bottom: 1.5rem;
           color: var(--hero-bg);
        }

        .learn-more {
          color: var(--accent-gold);
          text-decoration: none;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .legacy-image-frame {
          position: relative;
          padding: 20px;
        }

        .legacy-img {
          border-radius: 12px;
          box-shadow: 0 20px 60px var(--shadow-color);
        }

        .gold-border-accent {
          position: absolute;
          top: 0; left: 0;
          width: 60px; height: 60px;
          border-top: 3px solid var(--accent-gold);
          border-left: 3px solid var(--accent-gold);
        }

        @media (max-width: 992px) {
          .hero-grid, .legacy-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero { height: auto; padding: 140px 0 80px; }
          .hero-h1 { font-size: 3rem; margin-bottom: 1.5rem; }
          .hero-p { font-size: 1.1rem; margin-bottom: 2.5rem; }
          .hero-actions { justify-content: center; }
          .gold-rule { margin: 0 auto 1.5rem; }
          .legacy-image-frame { order: -1; }
          .section-title { font-size: 2.5rem; }
        }

        @media (max-width: 480px) {
           .hero-h1 { font-size: 2.5rem; }
           .hero-actions { flex-direction: column; gap: 15px; }
           .hero-actions .gold-button, .hero-actions .outline-button { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default Home
