import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PlusCircle, DashCircle, XCircle } from 'react-bootstrap-icons';
import { Renglon } from '../../../../codegen_output';
import { useCart } from '../CartContext';
import tapaNotAvailableImage from '../../../../assets/icons/generic_tapa_not_available.webp'
import { fetchTapaImageByProductId } from '../../../Common/ImageFetcher';

interface Props {
  item: Renglon;
}

function CartItem({ item }: Props) {
  const context = useCart();
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await fetchTapaImageByProductId(item.producto_id);
      setLoadedImage(imageUrl);
    };
  
    fetchImage();
  }, [item.producto_id]);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { removeFromCart, addToCart } = context;

  const handleRemoveFromCart = () => {
    removeFromCart(item.producto_id);
  };

  const handleIncreaseQuantity = () => {
    addToCart(item.producto_id, 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.cantidad > 1) {
      addToCart(item.producto_id, -1);
    } else {
      removeFromCart(item.producto_id);
    }
  };

  return (
    <Card className="cart-item">
      <div className="card-content">
        <div className="d-flex align-items-center">
          {/* Product Image */}
          <div className="cart-item-image">
            <img src={loadedImage || tapaNotAvailableImage} alt={item.producto.titulo} />
          </div>
          {/* Quantity Buttons */}
          <div className="cart-item-quantity">
            <Button variant="light" onClick={handleDecreaseQuantity} className="cart-item-button">
              <DashCircle />
            </Button>
            <span>{item.cantidad}</span>
            <Button variant="light" onClick={handleIncreaseQuantity} className="cart-item-button">
              <PlusCircle />
            </Button>
          </div>
          {/* Product Details */}
          <div className="cart-item-details">
            <Card.Title>{item.producto.titulo}</Card.Title>
            <Card.Subtitle>${item.monto.toFixed(2)}</Card.Subtitle>
          </div>
          {/* Remove Button */}
          <Button variant="danger" onClick={handleRemoveFromCart} className="cart-item-remove">
            <XCircle />
          </Button>
        </div>
      </div>
    </Card>
  )}

export default CartItem;