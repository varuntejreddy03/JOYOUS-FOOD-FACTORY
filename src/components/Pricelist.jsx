import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const domesticProducts = [
  { id: 'dom-rose', name: 'Rose Flavour', pack: 'Pack of 1 × 25 pcs', price: 450 },
  { id: 'dom-choco', name: 'Chocolate Flavour', pack: 'Pack of 1 × 25 pcs', price: 450 },
  { id: 'dom-pista', name: 'Pista Flavour', pack: 'Pack of 1 × 25 pcs', price: 450 },
  { id: 'dom-vanilla', name: 'Vanilla Flavour', pack: 'Pack of 1 × 25 pcs', price: 450 },
  { id: 'dom-kesar', name: 'Kesar Badam Flavour', pack: 'Pack of 1 × 25 pcs', price: 450 },
];

const commercialProducts = [
  { id: 'com-rose', name: 'Rose Flavour', pack: 'Pack of 1 × 50 pcs', price: 850 },
  { id: 'com-choco', name: 'Chocolate Flavour', pack: 'Pack of 1 × 50 pcs', price: 850 },
  { id: 'com-pista', name: 'Pista Flavour', pack: 'Pack of 1 × 50 pcs', price: 850 },
  { id: 'com-vanilla', name: 'Vanilla Flavour', pack: 'Pack of 1 × 50 pcs', price: 850 },
  { id: 'com-kesar', name: 'Kesar Badam Flavour', pack: 'Pack of 1 × 50 pcs', price: 850 },
];

const Pricelist = () => {
  const [activeTab, setActiveTab] = useState('Domestic');

  const handleOrderNow = (product) => {
    const phoneNumber = "917013886521";
    const message = `Hi! I'm interested in ordering the *${product.name}* (${product.pack}) priced at ₹${product.price}. Please let me know how to proceed.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const ProductRow = ({ product }) => {
    return (
      <div className="product-row">
        <div className="product-details">
          <span className="flavor-name">{product.name}</span>
          <span className="pack-size">{product.pack}</span>
        </div>
        <div className="product-price">₹{product.price}</div>
        <div className="product-action">
          <button className="add-btn pill" onClick={() => handleOrderNow(product)}>
            Order
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pricelist-section">
      <header className="pricelist-header">
        <h2>Flavours & Pricing</h2>
        <p>Choose Domestic or Commercial packs</p>
      </header>

      {/* Mobile Tabs */}
      <div className="tab-container mobile-only">
        <button
          className={activeTab === 'Domestic' ? 'active' : ''}
          onClick={() => setActiveTab('Domestic')}
        >
          Domestic
        </button>
        <button
          className={activeTab === 'Commercial' ? 'active' : ''}
          onClick={() => setActiveTab('Commercial')}
        >
          Commercial
        </button>
      </div>

      <div className="layout-grid">
        {/* Domestic Section */}
        <section className={`menu-column domestic-col ${activeTab === 'Domestic' ? 'show-mobile' : 'hide-mobile'}`}>
          <h3 className="section-title desktop-only">Domestic</h3>
          <div className="rows-container">
            {domesticProducts.map((p) => <ProductRow key={p.id} product={p} />)}
          </div>
          <div className="note-bar info">
            “Shipping extra. Delivery all over India.”
          </div>
        </section>

        {/* Commercial Section */}
        <section className={`menu-column commercial-col ${activeTab === 'Commercial' ? 'show-mobile' : 'hide-mobile'}`}>
          <h3 className="section-title desktop-only">Commercial</h3>
          <div className="rows-container">
            {commercialProducts.map((p) => <ProductRow key={p.id} product={p} />)}
          </div>

          <div className="min-order-strip">
            <span className="min-order-label">Minimum Order</span>
            <div className="chips">
              {[250, 500, 750, 1000].map(val => (
                <span key={val} className="chip">{val}</span>
              ))}
            </div>
          </div>

          <div className="note-bar free-shipping">
            “Free shipping. Delivery all over India.”
          </div>
        </section>
      </div>


      <style jsx>{`
        .pricelist-section {
          padding: 60px 0;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .pricelist-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .pricelist-header h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          color: var(--hero-bg);
          margin-bottom: 8px;
        }

        .pricelist-header p {
          opacity: 0.6;
          font-size: 1rem;
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .menu-column {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px var(--shadow-color);
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          margin-bottom: 25px;
          color: var(--hero-bg);
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 15px;
        }

        .rows-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        .product-row {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          border: 1px solid #f5f5f5;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .product-row:hover {
          border-color: var(--accent-gold);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .product-details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .flavor-name {
          font-weight: 700;
          color: #222;
          font-size: 0.95rem;
        }

        .pack-size {
          font-size: 0.75rem;
          color: #888;
          margin-top: 2px;
        }

        .product-price {
          font-weight: 700;
          color: var(--hero-bg);
          margin: 0 15px;
          font-size: 0.95rem;
        }

        .add-btn {
          background: white;
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold);
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s;
        }

        .add-btn:hover {
          background: var(--accent-gold);
          color: white;
        }

        .qty-control {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--accent-gold);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .qty-control button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
        }

        .qty-control span {
          font-weight: 700;
          min-width: 15px;
          text-align: center;
          font-size: 0.9rem;
        }

        .note-bar {
          background: #fcfcfc;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          text-align: center;
          border-left: 3px solid #ddd;
          color: #666;
          font-style: italic;
        }

        .note-bar.free-shipping {
          border-left-color: #25D366;
        }

        .min-order-strip {
          margin: 20px 0;
          padding: 15px;
          background: var(--section-bg);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .min-order-label {
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--berry-pink);
        }

        .chips {
          display: flex;
          gap: 8px;
        }

        .chip {
          background: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--hero-bg);
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        /* Tabs */
        .tab-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          background: rgba(214, 0, 141, 0.05);
          padding: 6px;
          border-radius: 40px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
          border: 1px solid rgba(214, 0, 141, 0.1);
        }

        .tab-container button {
          border: none;
          background: none;
          padding: 10px 30px;
          border-radius: 35px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          color: var(--hero-bg);
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tab-container button.active {
          background: var(--hero-bg);
          color: white;
          opacity: 1;
          box-shadow: 0 4px 15px rgba(42, 1, 26, 0.2);
        }

        /* Sticky Mini Cart */
        .mini-cart-sticky {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 450px;
          background: var(--hero-bg);
          color: white;
          padding: 12px 20px;
          border-radius: 100px;
          z-index: 1001;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          animation: slideUp 0.4s ease-out;
        }

        @media (min-width: 1200px) {
          .mini-cart-sticky {
            left: auto;
            right: 40px;
            transform: none;
            width: 380px;
          }
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .mini-cart-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
        }

        .separator { opacity: 0.3; }
        .total-price { color: var(--accent-gold); font-size: 1.1rem; }

        .checkout-btn {
          background: var(--accent-gold);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: transform 0.2s;
        }

        .checkout-btn:hover {
          transform: scale(1.05);
        }

        @media (min-width: 769px) {
          .mobile-only { display: none; }
          .menu-column { display: block !important; }
        }

        @media (max-width: 768px) {
          .desktop-only { display: none; }
          .layout-grid { grid-template-columns: 1fr; }
          .menu-column.hide-mobile { display: none; }
          .menu-column.show-mobile { display: block; }
          .pricelist-section { padding: 40px 15px; }
          .pricelist-header h2 { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default Pricelist;
