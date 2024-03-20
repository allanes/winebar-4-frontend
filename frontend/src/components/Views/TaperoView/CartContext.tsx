import React, { createContext, useContext, useState } from 'react';
import { OrdenCompra, Pedido, Renglon, Cliente, ClienteOperaConTarjeta, PedidosService, RenglonCreate, Tapa } from '../../../codegen_output';


interface CartContextType {
  cartItems: Renglon[];
  ordenCliente: OrdenCompra | null;
  pedidoEnCurso: Pedido | null;
  clienteSiendoAtendido: Cliente | null;
  tarjetaCliente: number | null;
  setClienteData: (clienteIn: ClienteOperaConTarjeta | null, ordenIn: OrdenCompra | null, pedidoIn: Pedido | null) => void;  // Add this line
  addToCart: (productoId: number, qtty?: number) => void;
  removeFromCart: (productId: number) => void;  
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
  
  const addToCart = (productoId: number, qtty: number = 1) => {
    if (!tarjetaCliente) {
      return;
    }
    const renglonCreate: RenglonCreate = {
      cantidad: qtty,
      producto_id: productoId,
    };
  
    PedidosService.handleAgregarProductoBackendApiV1PedidosAgregarProductoPost(tarjetaCliente, renglonCreate)
      .then((renglon) => {
        const existingItem = cartItems.find(item => item.id === renglon.id);
        if (existingItem) {
          setCartItems(
            cartItems.map(item => item.id === renglon.id ? 
              { ...item, cantidad: renglon.cantidad } : 
              item
            )
          );
        } else {
          setCartItems([...cartItems, renglon]);
        }
      })
      .catch((error) => console.error('Error al agregar producto al carrito:', error));
  };

  const removeFromCart = (productId: number) => {
    if (!tarjetaCliente) {
      return;
    }

    PedidosService.handleQuitarRenglonBackendApiV1PedidosQuitarProductoPost(tarjetaCliente, productId)
      .then((renglon) => {
        setCartItems(cartItems.filter(item => item.id !== renglon.id));
      })
      .catch((error) => console.error('Error al quitar producto del carrito:', error));
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
