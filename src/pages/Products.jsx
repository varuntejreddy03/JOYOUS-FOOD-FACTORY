import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Pricelist from '../components/Pricelist'

const Products = () => {
  return (
    <div className="products-page">
      <div className="container section">
        <Link to="/" className="btn-back fade-in">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <header className="page-header text-center fade-in">
          <span className="label-caps">OUR COLLECTION</span>
          <h1 className="page-title">Original & Fresh Daily</h1>
          <p className="page-subtitle">Available individually, in gift boxes, and in bulk orders. Choose from our specialized packs below.</p>
        </header>

        {/* Pricing Selection at the Top */}
        <Pricelist />

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

        .page-header {
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .page-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          color: var(--hero-bg);
        }

        .page-subtitle {
          font-size: 1.1rem;
          opacity: 0.7;
          line-height: 1.6;
        }

        .section-title {
           font-size: 2.5rem;
           margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .page-title { font-size: 2.5rem; }
          .section-title { font-size: 2rem; }
          .products-page { padding-top: 80px; }
        }
      `}</style>
    </div>
  )
}

export default Products
