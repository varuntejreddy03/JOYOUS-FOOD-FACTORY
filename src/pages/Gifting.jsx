import React from 'react'

const Gifting = () => {
  return (
    <div className="gifting-page">
      <section className="gifting-hero">
        <div className="diagonal-texture"></div>
        <div className="container text-center fade-in">
          <span className="label-caps italic-accent" style={{ color: 'white' }}>CORPORATE & BULK GIFTING</span>
          <h1 className="hero-h1" style={{ color: 'white' }}>Make Every Occasion <br /> <span className="italic-accent">Unforgettable</span></h1>
          <p style={{ color: 'white', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>From intimate weddings to large corporate events — Silver Bites delivers premium chocolate beedas in bulk, fully customized for your occasion.</p>
        </div>
      </section>

      <section className="occasions-section section">
        <div className="container">
          <header className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">Perfect For Every Celebration</h2>
          </header>

          <div className="gifting-grid">
            <div className="gift-card fade-in">
              <div className="card-image-placeholder gold-gradient">🎊</div>
              <div className="card-content">
                <h3>Weddings & Engagements</h3>
                <p>Return gifts, welcome hampers, mehendi favours — our beedas make the perfect wedding memory.</p>
              </div>
            </div>

            <div className="gift-card fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="card-image-placeholder dark-gradient">🏢</div>
              <div className="card-content">
                <h3>Corporate Gifting</h3>
                <p>Diwali gifts, client appreciation, event giveaways — branded boxes available.</p>
              </div>
            </div>

            <div className="gift-card fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="card-image-placeholder gold-gradient">🎉</div>
              <div className="card-content">
                <h3>Festivals</h3>
                <p>Diwali, Eid, Holi, New Year — celebrate with something truly special and uniquely Indian.</p>
              </div>
            </div>

            <div className="gift-card fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="card-image-placeholder dark-gradient">🎂</div>
              <div className="card-content">
                <h3>Personal Milestones</h3>
                <p>Custom flavour boxes with personalized packaging for birthdays and anniversaries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="customization-section section" style={{ backgroundColor: '#fff' }}>
        <div className="container customization-layout">
          <div className="custom-text">
            <span className="label-caps">PERSONALIZATION</span>
            <h2 className="section-title">What Can Be Customized?</h2>
            <ul className="custom-list">
              <li>✦ Choose your flavours (mix & match from 6+)</li>
              <li>✦ Box size: 4pc | 8pc | 12pc | 24pc | Custom</li>
              <li>✦ Custom branding & logo on packaging</li>
              <li>✦ Personalized message cards</li>
              <li>✦ Delivery across Hyderabad & Telangana</li>
              <li>✦ Bulk MOQ available on request</li>
            </ul>
          </div>
          <div className="custom-cta-box glass-effect">
            <h3>Ready to Place a Bulk Order?</h3>
            <p>Call or WhatsApp us directly — we'll handle everything from flavour selection to delivery.</p>
            <div className="cta-btns">
              <a href="https://wa.me/917013886521" className="gold-button">WhatsApp 7013886521</a>
              <a href="mailto:Joyousfoodshyd@gmail.com" className="outline-button">Email Us</a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .gifting-page {
          background-color: var(--section-bg);
        }

        .gifting-hero {
          height: 60vh;
          min-height: 400px;
          background-color: var(--hero-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .section-title { font-size: 2.8rem; margin-bottom: 20px; }

        .gifting-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .gift-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.4s;
          text-align: center;
        }

        .gift-card:hover { transform: translateY(-5px); }

        .card-image-placeholder {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 4rem;
        }

        .gold-gradient { background: linear-gradient(135deg, var(--accent-gold) 0%, #a8764b 100%); }
        .dark-gradient { background: linear-gradient(135deg, var(--hero-bg) 0%, #000 100%); }

        .card-content { padding: 30px; }
        .card-content h3 { font-size: 1.25rem; margin-bottom: 10px; color: var(--hero-bg); }
        .card-content p { opacity: 0.7; font-size: 0.9rem; line-height: 1.5; }

        .customization-layout {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 80px;
           align-items: center;
        }

        .custom-list { list-style: none; margin-top: 30px; }
        .custom-list li { font-size: 1.1rem; margin-bottom: 15px; opacity: 0.9; }

        .custom-cta-box {
           background: var(--section-bg);
           padding: 50px;
           border-radius: 16px;
           text-align: center;
        }

        .custom-cta-box h3 { margin-bottom: 15px; font-size: 1.8rem; }
        .custom-cta-box p { margin-bottom: 30px; opacity: 0.8; }
        
        .cta-btns { display: flex; flex-direction: column; gap: 15px; }

        @media (max-width: 992px) {
          .customization-layout { grid-template-columns: 1fr; gap: 40px; }
          .section-title { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  )
}

export default Gifting
