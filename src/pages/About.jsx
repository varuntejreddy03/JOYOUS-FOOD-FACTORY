import React from 'react'

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="diagonal-texture"></div>
        <div className="container">
          <div className="hero-text-center fade-in">
            <span className="label-caps italic-accent" style={{ color: 'white' }}>OUR STORY</span>
            <h1 className="hero-h1">Born in Hyderabad. <br /> <span className="italic-accent">Built on Tradition.</span></h1>
          </div>
        </div>
      </section>

      <section className="about-content section">
        <div className="container">
          <div className="about-split">
            <div className="about-text-col fade-in">
              <p className="story-para">Joyous Food Factory started with one simple mission — to bring authentic Indian flavours to modern tables. As the Authorized Dealer of Telangana, we take pride in representing a product that is truly rooted in Indian culture while standing tall in contemporary gifting and lifestyle.</p>

              <p className="story-para">Our signature product, the Chocolate Beeda, is a celebration of contrasts — the bold richness of premium chocolate meeting the aromatic warmth of traditional pan fillings. Each piece is handcrafted fresh at our Hyderabad facility, using only the finest ingredients — real saffron, fresh pistachios, pure gulkand, and premium chocolate couverture.</p>

              <p className="story-para">Silver Bites is our promise — a silver standard in every bite. Whether you're gifting at a wedding, celebrating a festival, or simply treating yourself, we craft each box with the same love and attention to detail.</p>
            </div>
            <div className="about-badge-col">
              <div className="luxury-frame">
                <div className="brand-card">
                  <span className="label-caps">The Brand</span>
                  <h3>Silver Bites</h3>
                  <p style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>by Joyous Food Factory</p>
                  <div className="card-divider" />
                  <p>Status: Authorized Distributor of Telangana</p>
                  <p>Location: KPHB, Hyderabad, Telangana</p>
                  <p>Contact: 7013886521</p>
                </div>
                <div className="gold-accent-tl"></div>
                <div className="gold-accent-br"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values section" style={{ backgroundColor: 'var(--hero-bg)', color: 'var(--text-primary)' }}>
        <div className="container">
          <header className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: 'white' }}>What We Stand For</h2>
          </header>

          <div className="values-grid">
            <div className="value-item">
              <h3 className="italic-accent">Authenticity</h3>
              <p>Real ingredients, real tradition, real flavour. No artificial shortcuts.</p>
            </div>
            <div className="value-item">
              <h3 className="italic-accent">Craftsmanship</h3>
              <p>Every piece made by hand, every single day.</p>
            </div>
            <div className="value-item">
              <h3 className="italic-accent">Innovation</h3>
              <p>Traditional beeda meets modern chocolate — a category we created.</p>
            </div>
            <div className="value-item">
              <h3 className="italic-accent">Accessibility</h3>
              <p>Premium quality, priced for everyone to enjoy and gift.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          background-color: var(--section-bg);
        }

        .about-hero {
          height: 70vh;
          min-height: 500px;
          background-color: var(--hero-bg);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-text-center { text-align: center; }

        .about-split {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: center;
        }

        .story-para {
          font-size: 1.15rem;
          line-height:1.7;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .brand-card {
           background: white;
           padding: 40px;
           text-align: center;
           border-radius: 8px;
           box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .brand-card h3 { font-size: 2rem; margin-bottom: 5px; }
        
        .card-divider {
           width: 40px; height: 2px;
           background: var(--accent-gold);
           margin: 20px auto;
        }

        .brand-card p { font-size: 0.9rem; margin-bottom: 10px; opacity: 0.8; }

        .luxury-frame { position: relative; padding: 20px; }
        .gold-accent-tl {
          position: absolute; top: 0; left: 0;
          width: 40px; height: 40px;
          border-top: 2px solid var(--accent-gold); border-left: 2px solid var(--accent-gold);
        }
        .gold-accent-br {
          position: absolute; bottom: 0; right: 0;
          width: 40px; height: 40px;
          border-bottom: 2px solid var(--accent-gold); border-right: 2px solid var(--accent-gold);
        }

        .section-title { font-size: 3rem; }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 60px 80px;
        }

        .value-item h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--accent-gold);
        }

        @media (max-width: 992px) {
          .about-split { grid-template-columns: 1fr; gap: 40px; }
          .values-grid { grid-template-columns: 1fr; gap: 40px; }
          .section-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  )
}

export default About
