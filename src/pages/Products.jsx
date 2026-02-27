import React from 'react'

const products = [
  {
    name: 'Original Chocolate Choco Beeda',
    price: 'Bestseller 🏆',
    color: '#1e0e05',
    desc: 'Dark premium chocolate shell packed with a rich blend of dry fruits, fennel seeds, rose petals, and traditional beeda mix.',
    available: '4pc box | 8pc box | Bulk'
  },
  {
    name: 'Rose Gulkand Choco Beeda',
    price: 'Customer Favourite 💗',
    color: '#f2c4ce',
    desc: 'Blush pink chocolate shell filled with sweet gulkand, rose petals, and aromatic beeda mix. Floral, romantic, unforgettable.',
    available: '4pc box | 8pc box | Bulk'
  },
  {
    name: 'Kesar Badam Choco Beeda',
    price: 'Festive Special ✨',
    color: '#e8a020',
    desc: 'Saffron-gold chocolate infused with premium kesar (saffron), loaded with whole almonds and festive dry fruit mix.',
    available: '4pc box | 8pc box | Bulk'
  },
  {
    name: 'Pistachio Delight Choco Beeda',
    price: "Nut Lover's Pick 🌿",
    color: '#8db87a',
    desc: 'Sage green chocolate shell bursting with fresh pistachios, dry fruits, and the classic beeda filling — nutty, crunchy, indulgent.',
    available: '4pc box | 8pc box | Bulk'
  },
  {
    name: 'Mango Fusion Choco Beeda',
    price: 'Seasonal Special 🥭',
    color: '#ffcc33',
    desc: 'A tropical twist — mango-flavoured chocolate shell with fruity beeda filling. Vibrant, refreshing, and totally unique.',
    available: '4pc box | 8pc box | Bulk'
  },
  {
    name: 'Vanilla Choco Beeda',
    price: 'New Arrival 🤍',
    color: '#f5f0e8',
    desc: 'Creamy ivory white chocolate shell with a classic beeda filling — mild, elegant, and perfect for those who love subtle sweetness.',
    available: '4pc box | 8pc box | Bulk'
  },
]

const Products = () => {
  return (
    <div className="products-page">
      <div className="container section">
        <header className="page-header text-center fade-in">
          <span className="label-caps">OUR COLLECTION</span>
          <p className="page-subtitle">Handcrafted fresh daily. Available individually, in gift boxes, and in bulk orders.</p>
        </header>

        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="product-image-container" style={{ backgroundColor: product.color + '22' }}>
                <div className="product-image main-view">
                  <div className="product-placeholder" style={{
                    background: `linear-gradient(135deg, ${product.color} 0%, #000 100%)`,
                    height: '100%', width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '3rem'
                  }}>
                    ✦
                  </div>
                </div>
                <div className="product-image hover-view">
                  <div className="product-reveal" style={{
                    background: 'white', border: `1px solid var(--accent-gold)`,
                    height: '100%', width: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', padding: '20px'
                  }}>
                    <span className="label-caps" style={{ color: product.color }}>Flavour Insight</span>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', textAlign: 'center' }}>{product.desc}</p>
                  </div>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-tagline italic-accent">{product.price}</p>
                <div className="available-sizes">
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Available in:</span>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{product.available}</p>
                </div>
                <button className="gold-button" style={{ width: '100%', marginTop: '20px' }}>Inquire for Price</button>
              </div>
            </div>
          ))}
        </div>

        {/* Flavours Overview Section */}
        <section className="flavours-overview fade-in" style={{ marginTop: '80px' }}>
          <div className="overview-image">
            <img src="/assets/B__382__copy.jpg" alt="All Flavours Collection" />
          </div>
          <div className="overview-caption text-center">
            <p className="italic-accent">✦ Original Chocolate  ✦ Rose Gulkand  ✦ Kesar Badam  ✦ Pistachio Delight  ✦ Mango Fusion  ✦ Vanilla</p>
            <p style={{ marginTop: '5px', opacity: 0.7 }}>— All available for individual & bulk orders</p>
          </div>
        </section>

        <section className="custom-order-cta section text-center fade-in">
          <h2 className="section-title">Want a Custom Flavour?</h2>
          <p className="page-subtitle" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>We love creating new combinations! Reach out for fully customized chocolate beedas for your wedding, corporate event, or special occasion.</p>
          <a href="https://wa.me/917013886521" className="outline-button">Request Custom Order →</a>
        </section>
      </div>

      <style jsx>{`
        .products-page {
          background-color: var(--section-bg);
          padding-top: 100px;
        }

        .flavours-overview {
          margin-bottom: 80px;
          border-radius: 16px;
          overflow: hidden;
          background: white;
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        .overview-image {
          height: 500px;
          overflow: hidden;
        }

        .overview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overview-caption {
          padding: 30px;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .overview-caption .italic-accent {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .page-header {
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .page-title {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          color: var(--hero-bg);
        }

        .page-subtitle {
          font-size: 1.1rem;
          opacity: 0.7;
          line-height: 1.6;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 40px;
        }

        .product-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 1px solid rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
        }

        .product-image-container {
          position: relative;
          height: 280px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 25px;
        }

        .product-image {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .hover-view { opacity: 0; transform: scale(1.1); }
        .product-card:hover .main-view { opacity: 0; transform: scale(0.9); }
        .product-card:hover .hover-view { opacity: 1; transform: scale(1); }

        .product-info h3 {
          font-size: 1.3rem;
          margin-bottom: 8px;
          color: var(--hero-bg);
          min-height: 3.2rem;
          display: flex;
          align-items: center;
        }

        .product-tagline {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 15px;
        }

        .available-sizes {
           background: #fcfcfc;
           padding: 10px;
           border-radius: 6px;
           margin-top: auto;
        }

        .section-title {
           font-size: 2.5rem;
           margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .page-title { font-size: 2.5rem; }
          .section-title { font-size: 2rem; }
        }
      `}</style>
    </div>
  )
}

export default Products
