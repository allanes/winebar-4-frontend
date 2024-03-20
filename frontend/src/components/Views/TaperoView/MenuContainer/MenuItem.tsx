import React, { useState, useEffect } from 'react';
import { Tapa, PedidosService, RenglonCreate, TapasService } from '../../../../codegen_output';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../CartContext';
import tapaNotAvailableImage from '../../../../assets/icons/generic_tapa_not_available.webp'

interface Props {
  tapa: Tapa;
}

function MenuItem({ tapa }: Props) {
  const { tarjetaCliente, addToCart } = useCart()!;
  const [loadedImage, setLoadedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (tapa.foto) {
        try {
          const response = await TapasService.handleGetFotoBackendApiV1TapasFotoIdGet(tapa.id);
          if (response instanceof Blob) {
            const imageUrl = URL.createObjectURL(response);
            setLoadedImage(imageUrl);
          } else {
            console.error('Response is not a Blob:', response);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
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
    if (!tarjetaCliente) {
      return;
    }
    const renglonCreate: RenglonCreate = {
      cantidad: 1,
      producto_id: tapa.producto.id,
    };
    
    PedidosService.handleAgregarProductoBackendApiV1PedidosAgregarProductoPost(tarjetaCliente, renglonCreate)
      .then((renglon) => {
        addToCart(renglon);
      })
      .catch((error) => console.error('Error al agregar producto al carrito:', error));
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