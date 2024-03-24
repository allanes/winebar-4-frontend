import React, { useState, useEffect } from 'react';
import { Tapa, PedidosService, RenglonCreate, TapasService } from '../../../../codegen_output';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../CartContext';
import { fetchTapaImage } from '../../../Common/ImageFetcher';
import tapaNotAvailableImage from '../../../../assets/icons/generic_tapa_not_available.webp'

interface Props {
  tapa: Tapa;
}

function MenuItem({ tapa }: Props) {
  const { addToCart } = useCart()!;
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await fetchTapaImage(tapa); // Use the fetchTapaImage function
          setLoadedImage(imageUrl);
      };

    fetchImage();
    // Clean up the object URL when the component unmounts.
    return () => {
      if (loadedImage) {
        URL.revokeObjectURL(loadedImage);
      }
    };
  }, [tapa.id, tapa.foto]);

  const handleAddToCart = () => {
    addToCart(tapa.producto.id);
  };

  return (
    <Card className="product-item" id={`${tapa.id}`}>
      <div
        className="card-img-background"
        style={{ backgroundImage: `url(${loadedImage ? loadedImage : tapaNotAvailableImage })` }}
      >
        <div className="card-content">
          <Card.Title>{tapa.producto.titulo}</Card.Title>
          <Card.Subtitle className='mt-3 mb-2'>${tapa.producto.precio}</Card.Subtitle>
          <Button variant="dark" onClick={handleAddToCart}>
            Agregar
          </Button>
        </div>
      </div>      
    </Card>
  );
}

export default MenuItem;