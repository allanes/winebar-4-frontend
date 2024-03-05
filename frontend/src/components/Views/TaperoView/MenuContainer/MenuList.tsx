import React, { useEffect, useState } from 'react';
import { Tapa, TapasService, ApiError } from '../../../../codegen_output';
import MenuItem from './MenuItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';

function MenuList() {
  const [tapasList, setTapasList] = useState<Tapa[]>([]);

  useEffect(() => {
    fetchTapa();
  }, []);

  const fetchTapa = () => {
    TapasService.handleReadTapasBackendApiV1TapasGet()
      .then((tapas) => {
        setTapasList(tapas);        
      })
      .catch(handleApiError);
  };

  const handleApiError = (error: unknown) => {
    const err = error as ApiError;
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }
    Swal.fire('Error', errorMessage, 'error');
  };

  return (
    <Container className="menu-list">
      <Row className="separador-principal" >
        {tapasList.map((tapa) => (
          <Col >
            <MenuItem key={tapa.id} tapa={tapa} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MenuList;
