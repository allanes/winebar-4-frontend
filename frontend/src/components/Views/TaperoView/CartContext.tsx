import React, { createContext, useContext, useState } from 'react';
import { OrdenCompra, Pedido, Renglon, Cliente, ClienteOperaConTarjeta } from '../../../codegen_output';


interface CartContextType {
  cartItems: Renglon[];
  ordenCliente: OrdenCompra | null;
  pedidoEnCurso: Pedido | null;
  clienteSiendoAtendido: Cliente | null;
  tarjetaCliente: number | null;
  setClienteData: (clienteIn: ClienteOperaConTarjeta | null, ordenIn: OrdenCompra | null, pedidoIn: Pedido | null) => void;  // Add this line
  addToCart: (newItem: Renglon) => void;
  removeFromCart: (id: number) => void;
  updateQuantityInCart: (id: number, quantity: number) => void;
  emptyCart: () => void;
  clearClientData: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Renglon[]>([]);
  const [ordenCliente, setOrdenCliente] = useState<OrdenCompra | null>(null);
  const [pedidoEnCurso, setPedidoEnCurso] = useState<Pedido | null>(null);
  const [clienteSiendoAtendido, setClienteSiendoAtendido] = useState<Cliente | null>(null);
  const [tarjetaCliente, setTarjetaCliente] = useState<number | null>(null)
  
  const addToCart = (newItem: Renglon) => {
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      setCartItems(
        cartItems.map(item => item.id === newItem.id ? 
          { ...item, cantidad: newItem.cantidad } : 
          item
        )
      );
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

  const emptyCart = () => {
    setCartItems([]);
  }

  const setClienteData = (clienteIn: ClienteOperaConTarjeta | null, ordenIn: OrdenCompra | null, pedidoIn: Pedido | null) => {
    if (clienteIn && clienteIn.cliente) {
      setClienteSiendoAtendido(clienteIn.cliente)
      if (clienteIn.tarjeta_id) {
        setTarjetaCliente(clienteIn.tarjeta_id)
        }
    }

    if (ordenIn) {
      setOrdenCliente(ordenIn)
    }

    if (pedidoIn) {
      setPedidoEnCurso(pedidoIn)
    }

  }

  const clearClientData = () => {
    setCartItems([])
    setOrdenCliente(null)
    setPedidoEnCurso(null)
    setClienteSiendoAtendido(null)
    setTarjetaCliente(null)
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      ordenCliente, 
      pedidoEnCurso, 
      clienteSiendoAtendido, 
      tarjetaCliente,
      setClienteData, 
      addToCart, 
      removeFromCart, 
      updateQuantityInCart, 
      emptyCart,
      clearClientData }}>
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
