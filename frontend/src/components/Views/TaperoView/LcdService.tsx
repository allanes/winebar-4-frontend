// lcd.service.tsx
import React from 'react';
import servidorClavesConfig from '../../../config';

// https://pimylifeup.com/raspberry-pi-lcd-16x2/
interface InfoCliente {
    nombre: string;
    consumos: number;
    carrito: number;
}
  
const BASE_URL = `http://localhost:${servidorClavesConfig.servidorClavesPort}/lcd`;
  
export const displayLcdInfoCliente = async (infoCliente: InfoCliente) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoCliente),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {}
};

export const clearLcd = async () => {
    try {
      const response = await fetch(`${BASE_URL}/clear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        
      });
  
      const data = await response.json();
      return data;
    } catch (error) {}
};