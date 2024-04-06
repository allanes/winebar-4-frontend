import React, { useEffect } from 'react';
import { useCart } from './CartContext';

const TarjetaConsecutivaListener: React.FC = () => {
  const { tarjetaCliente, addToCartByPhysPort } = useCart()!;

  const handleSSEEvent = (event: MessageEvent) => {
    const cardData = JSON.parse(event.data);
    console.log('Evento recibido. Phys: ' + cardData.phys_port)
    console.log('Evento recibido. Tarjeta: ' + cardData.card_number + typeof(cardData.card_number))
    console.log('Tarjeta Logueada: ' + tarjetaCliente + typeof(tarjetaCliente))
    if (tarjetaCliente && cardData.card_number === tarjetaCliente) {
      addToCartByPhysPort(cardData.phys_port);
    }
  };

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/lectores-rfid/card-read-stream');
    eventSource.onmessage = handleSSEEvent;

    return () => {
      eventSource.close();
    };
  }, [tarjetaCliente]);

  return null;
};

export default TarjetaConsecutivaListener;