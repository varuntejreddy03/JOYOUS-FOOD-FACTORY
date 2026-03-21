import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('sliver-bites-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date().toLocaleTimeString());

  // Optimistic Background Sync Simulation
  useEffect(() => {
    // 1. Immediate Persistence (Optimistic)
    localStorage.setItem('sliver-bites-cart', JSON.stringify(cart));
    
    // 2. Mock Cloud Store Sync
    if (cart.length > 0) {
      setIsSyncing(true);
      const timer = setTimeout(() => {
        setIsSyncing(false);
        setLastSynced(new Date().toLocaleTimeString());
      }, 800); // Simulate network/db delay
      return () => clearTimeout(timer);
    } else {
      setIsSyncing(false);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem?.quantity === 1) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      cartTotal, 
      cartCount,
      isSyncing,
      lastSynced
    }}>
      {children}
    </CartContext.Provider>
  );
};
