import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If item already exists in cart, increment quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        // If item does not exist in cart, add new item
        return [...prevItems, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const emptyCart = () => {
    setCartItems([])
  }

  const updateQuantityInCart = (id, quantity) => {
    setCartItems((prevItems) => prevItems.map((item) => item.id === id ? { ...item, qty: quantity } : item));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantityInCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
