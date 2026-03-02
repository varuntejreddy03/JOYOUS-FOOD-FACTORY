import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const domesticProducts = [
  { id: 'dom-rose', name: 'Rose Flavour', pack: 'Pack of 1 × 25 pcs', price: 450, image: '/2/B (130) copy.jpg' },
  { id: 'dom-choco', name: 'Chocolate Flavour', pack: 'Pack of 1 × 25 pcs', price: 450, image: '/1/B (71) copy.jpg' },
  { id: 'dom-pista', name: 'Pista Flavour', pack: 'Pack of 1 × 25 pcs', price: 450, image: '/4/B (268) copy.jpg' },
  { id: 'dom-vanilla', name: 'Vanilla Flavour', pack: 'Pack of 1 × 25 pcs', price: 450, image: '/5/B (352) copy.jpg' },
  { id: 'dom-kesar', name: 'Kesar Badam Flavour', pack: 'Pack of 1 × 25 pcs', price: 450, image: '/4/B (292) copy.jpg' },
];

const commercialProducts = [
  { id: 'com-rose', name: 'Rose Flavour', pack: 'Pack of 1 × 50 pcs', price: 850, image: '/2/B (130) copy.jpg' },
  { id: 'com-choco', name: 'Chocolate Flavour', pack: 'Pack of 1 × 50 pcs', price: 850, image: '/1/B (71) copy.jpg' },
  { id: 'com-pista', name: 'Pista Flavour', pack: 'Pack of 1 × 50 pcs', price: 850, image: '/4/B (268) copy.jpg' },
  { id: 'com-vanilla', name: 'Vanilla Flavour', pack: 'Pack of 1 × 50 pcs', price: 850, image: '/5/B (352) copy.jpg' },
  { id: 'com-kesar', name: 'Kesar Badam Flavour', pack: 'Pack of 1 × 50 pcs', price: 850, image: '/4/B (292) copy.jpg' },
];

const Pricelist = () => {
  const { cart, addToCart, removeFromCart, cartTotal, cartCount } = useCart();
  const [activeTab, setActiveTab] = useState('Domestic');

  const getItemQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const handleCheckout = () => {
    const phoneNumber = "917013886521";
    let message = "🛍️ *New Order from Joyous Food Factory*\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Pack: ${item.pack}\n`;
      message += `   Price: ₹${item.price * item.quantity}\n\n`;
    });

    message += `──────────────────\n`;
    message += `💰 *Total Amount: ₹${cartTotal}*\n`;
    message += `📦 *Total Items: ${cartCount}*\n\n`;
    message += `Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const ProductCard = ({ product }) => {
    const quantity = getItemQuantity(product.id);

    return (
      <div className="blinkit-card fade-in">
        <div className="card-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="card-details">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-pack">{product.pack}</p>
          <div className="card-bottom">
            <span className="card-price">₹{product.price}</span>
            <div className="card-action">
              {quantity === 0 ? (
                <button className="blinkit-add-btn" onClick={() => addToCart(product)}>
                  ADD
                </button>
              ) : (
                <div className="blinkit-qty-btn">
                  <button onClick={() => removeFromCart(product.id)}><Minus size={14} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => addToCart(product)}><Plus size={14} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pricelist-section">
      <div className="tab-container">
        <button
          className={activeTab === 'Domestic' ? 'active' : ''}
          onClick={() => setActiveTab('Domestic')}
        >
          Domestic Packs
        </button>
        <button
          className={activeTab === 'Commercial' ? 'active' : ''}
          onClick={() => setActiveTab('Commercial')}
        >
          Commercial Packs
        </button>
      </div>

      <div className="blinkit-grid">
        {(activeTab === 'Domestic' ? domesticProducts : commercialProducts).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="shipping-note text-center">
        {activeTab === 'Domestic'
          ? "🚚 Shipping extra. Delivery all over India."
          : "🚚 Free shipping on Commercial orders. Delivery all over India."}
      </div>

      {/* Sticky Mini Cart */}
      {cartCount > 0 && (
        <div className="mini-cart-sticky">
          <div className="mini-cart-content">
            <div className="cart-info">
              <ShoppingCart size={20} />
              <div className="cart-text">
                <span className="cart-count">{cartCount} items</span>
                <span className="cart-total">₹{cartTotal}</span>
              </div>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .pricelist-section {
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 15vh;
        }

        /* Tabs */
        .tab-container {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
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
          padding: 12px 35px;
          border-radius: 35px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--hero-bg);
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tab-container button.active {
          background: var(--hero-bg);
          color: white;
          opacity: 1;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        /* Grid */
        .blinkit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          padding: 0 10px;
        }

        /* Card (Blinkit Style) */
        .blinkit-card {
          background: white;
          border-radius: 12px;
          padding: 12px;
          border: 1px solid #eee;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .blinkit-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          border-color: var(--accent-gold);
        }

        .card-image {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 12px;
          background: #f8f8f8;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .card-pack {
          font-size: 0.75rem;
          color: #666;
          margin-bottom: 15px;
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .card-price {
          font-weight: 800;
          font-size: 1rem;
          color: #111;
        }

        /* Buttons */
        .blinkit-add-btn {
          background: white;
          color: #d6008d;
          border: 1px solid #d6008d;
          padding: 6px 20px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .blinkit-add-btn:hover {
          background: #d6008d;
          color: white;
        }

        .blinkit-qty-btn {
          background: #d6008d;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .blinkit-qty-btn button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          padding: 2px;
        }

        .blinkit-qty-btn span {
          font-weight: 800;
          font-size: 0.85rem;
          min-width: 15px;
          text-align: center;
        }

        .shipping-note {
          margin-top: 40px;
          font-size: 0.9rem;
          color: #666;
          font-style: italic;
        }

        /* Sticky Cart */
        .mini-cart-sticky {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 500px;
          background: #d6008d;
          color: white;
          padding: 12px 20px;
          border-radius: 12px;
          z-index: 1000;
          box-shadow: 0 8px 32px rgba(214, 0, 141, 0.4);
          animation: slideUp 0.3s ease-out;
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
        }

        .cart-text {
          display: flex;
          flex-direction: column;
        }

        .cart-count {
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0.9;
        }

        .cart-total {
          font-size: 1.1rem;
          font-weight: 800;
        }

        .checkout-btn {
          background: white;
          color: #d6008d;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        @keyframes slideUp {
          from { bottom: -100px; opacity: 0; }
          to { bottom: 20px; opacity: 1; }
        }

        @media (max-width: 600px) {
          .blinkit-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .tab-container button { padding: 10px 20px; font-size: 0.8rem; }
          .card-title { font-size: 0.85rem; }
          .card-price { font-size: 0.9rem; }
          .blinkit-add-btn { padding: 5px 15px; }
        }
      `}</style>
    </div>
  );
};

export default Pricelist;
