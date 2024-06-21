// InfoCardMontoDesglosado.tsx
import React from 'react';
import { Card } from 'react-bootstrap';
// import { FaCashRegister, FaCreditCard, FaUniversity } from 'react-icons/fa';
import pagoEfectivo from '../../../../assets/icons/pago-efectivo.png';
import pagoTarjeta from '../../../../assets/icons/pago-tarjeta.png';
import pagoTransferencia from '../../../../assets/icons/pago-transferencia.png';

interface InfoCardMontoDesglosadoProps {
  title: string;
  totalAmount: number | string;
  cash: number | string;
  card: number | string;
  bankTransfer: number | string;
}

const InfoCardMontoDesglosado = ({ title, totalAmount, cash, card, bankTransfer }: InfoCardMontoDesglosadoProps) => {
  return (
    <Card className="info-card monto-desglosado">
      <Card.Body>
        <div className="info-card-count">
          {totalAmount.toLocaleString('es-ES')}
        </div>
        <div className="info-card-breakdown">
          {/* <img src={pagoEfectivo} alt="Pago Efectivo" style={{ width: 24, height: 24 }} /> $ {cash.toLocaleString('es-ES')} */}
          <img src={pagoEfectivo} alt="Pago Efectivo" style={{ width: 24, height: 24 }} /> $ {cash.toLocaleString('es-ES')}
          {/* <img src={pagoTarjeta} alt="Pago Tarjeta" style={{ width: 24, height: 24 }} /> $ {card.toLocaleString('es-ES')} */}
          <img src={pagoTarjeta} alt="Pago Tarjeta" style={{ width: 24, height: 24 }} /> $ {card.toLocaleString('es-ES')}
          {/* <img src={pagoTransferencia} alt="Pago Transferencia" style={{ width: 24, height: 24 }} /> $ {bankTransfer.toLocaleString('es-ES')} */}
          <img src={pagoTransferencia} alt="Pago Transferencia" style={{ width: 24, height: 24 }} /> $ {bankTransfer.toLocaleString('es-ES')}
        </div>
        <div className="info-card-title">
            {title}
        </div>
      </Card.Body>
    </Card>
  );
};

export default InfoCardMontoDesglosado;
