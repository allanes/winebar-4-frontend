import React, { createContext, useContext, useState } from 'react';
import { Renglon } from '../../../../codegen_output';

interface CartContextType {
  cartItems: Renglon[];
  addToCart: (item: Renglon) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<Renglon[]>([]);

  const addToCart = (newItem: Renglon) => {
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === newItem.id ? { ...item, cantidad: item.cantidad + newItem.cantidad } : item));
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
