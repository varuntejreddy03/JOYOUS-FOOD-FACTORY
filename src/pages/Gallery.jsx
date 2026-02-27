import React, { useState } from 'react'

const Gallery = () => {
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Products', 'Cut-Open Shots', 'Gift Boxes', 'Festive', 'Behind the Scenes']

  const items = [
    { title: "The Classic Three — Chocolate, Rose & Pistachio", cat: 'Products' },
    { title: "Inside the Dark Chocolate Beeda", cat: 'Cut-Open Shots' },
    { title: "Rose Gulkand — cut open to reveal the magic", cat: 'Cut-Open Shots' },
    { title: "The full Silver Bites flavour lineup", cat: 'Products' },
    { title: "Vanilla Choco Beeda — creamy & indulgent", cat: 'Products' },
    { title: "Kesar Badam — our festive special", cat: 'Festive' },
    { title: "Gift-ready boxes for every occasion", cat: 'Gift Boxes' },
    { title: "Gold-wrapped ready-to-gift beedas", cat: 'Gift Boxes' },
  ]

  const filteredItems = filter === 'All' ? items : items.filter(i => i.cat === filter)

  return (
    <div className="gallery-page">
      <section className="gallery-header section text-center fade-in">
        <div className="container">
          <span className="label-caps">VISUAL STORYTELLING</span>
          <h1 className="page-title">A Feast for the <span className="italic-accent">Eyes</span></h1>
          <p className="gallery-subtitle">Our chocolate beedas are as beautiful as they are delicious. Capturing the meticulous process and finished masterpieces.</p>
        </div>
      </section>

      <section className="filter-section container text-center">
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-grid-section section">
        <div className="container">
          <div className="masonry-gallery">
            {filteredItems.map((item, i) => (
              <div key={i} className={`gallery-item item-size-${(i % 3) + 1} fade-in`}>
                <div className="gallery-image-wrapper">
                  <div className="gallery-placeholder" style={{
                    background: i % 2 === 0 ? 'var(--hero-bg)' : 'var(--accent-gold)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    fontSize: '2rem'
                  }}>
                    ✦
                  </div>
                  <div className="gallery-overlay">
                    <span className="overlay-text">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="instagram-cta section container text-center fade-in">
        <h2 className="section-title">Tag us on Instagram!</h2>
        <p className="page-subtitle" style={{ marginBottom: '30px' }}>Share your Silver Bites moments with #SilverBites #ChocolateBeeda #JoyousFoodFactory</p>
        <a href="#" className="gold-button">Follow us on Instagram</a>
      </section>

      <style jsx>{`
        .gallery-page {
          background-color: var(--section-bg);
          padding-top: 100px;
        }

        .page-title {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          color: var(--hero-bg);
        }

        .gallery-subtitle {
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.7;
          font-size: 1.1rem;
        }

        .filter-tabs {
           display: flex;
           justify-content: center;
           gap: 15px;
           flex-wrap: wrap;
           margin-bottom: 40px;
        }

        .filter-btn {
           background: transparent;
           border: 1px solid rgba(0,0,0,0.1);
           padding: 8px 20px;
           border-radius: 30px;
           font-family: var(--font-body);
           font-weight: 700;
           font-size: 0.8rem;
           text-transform: uppercase;
           letter-spacing: 1px;
           cursor: pointer;
           transition: all 0.3s;
        }

        .filter-btn.active, .filter-btn:hover {
           background: var(--hero-bg);
           color: white;
           border-color: var(--hero-bg);
        }

        .masonry-gallery {
          columns: 3;
          column-gap: 25px;
          min-height: 400px;
        }

        .gallery-item {
          break-inside: avoid;
          margin-bottom: 25px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .gallery-image-wrapper {
          position: relative;
          cursor: pointer;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .item-size-1 { height: 300px; }
        .item-size-2 { height: 450px; }
        .item-size-3 { height: 350px; }

        .gallery-image-wrapper:hover {
          transform: scale(1.02);
        }

        .gallery-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(30, 14, 5, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s;
          padding: 30px;
          text-align: center;
        }

        .gallery-image-wrapper:hover .gallery-overlay {
          opacity: 1;
        }

        .overlay-text {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.2rem;
          line-height: 1.4;
        }

        .section-title { font-size: 2.5rem; margin-bottom: 1rem; }

        @media (max-width: 992px) {
          .masonry-gallery { columns: 2; }
          .page-title { font-size: 3rem; }
        }

        @media (max-width: 600px) {
          .masonry-gallery { columns: 1; }
          .page-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  )
}

export default Gallery
