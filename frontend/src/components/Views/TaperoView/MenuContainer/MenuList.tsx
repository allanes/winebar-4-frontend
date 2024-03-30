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
    const fetchTapas = () => {
      TapasService.handleReadTapasBackendApiV1TapasGet()
        .then((tapas) => {
          setTapasList(tapas);        
        })
        .catch(handleApiError);
    };
    fetchTapas()
  }, []);  

  const handleApiError = (error: unknown) => {
    const err = error as ApiError;
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }
    Swal.fire('Error', errorMessage, 'error');
  };

  return (
    <div className="menu-container">
      <Container>
        <Row className="menu-list">
          {tapasList.map((tapa) => (
            <Col key={tapa.id} xs={9} sm={6} md={4} lg={3} >
              <MenuItem tapa={tapa} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MenuList;
