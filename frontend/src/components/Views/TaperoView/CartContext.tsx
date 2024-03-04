import React, { createContext, useContext, useState } from 'react';
import { Renglon } from '../../../codegen_output';
import { Renglon } from '../../../codegen_output';
const CartContext = createContext<CartContextType | null>(null);

interface CartContextType {
  cartItems: Renglon[];
  addToCart: (item: Renglon) => void;
  removeFromCart: (id: number) => void;
  updateQuantityInCart: (id: number, quantity: number) => void;
}

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Renglon[]>([]);

  const addToCart = (newItem: Renglon) => {
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === newItem.id ? { ...item, cantidad: item.cantidad + newItem.cantidad } : item));
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantityInCart = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, cantidad: quantity } : item));
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
