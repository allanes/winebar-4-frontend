import React, { useEffect, useState } from 'react';
import { Tapa, TapasService, ApiError, TapaConProductoCreate } from '../../codegen_output';
import { LectoresDeTapasService, LectorTapa } from '../../codegen_output';
import { Body_handle_upload_foto_backend_api_v1_tapas_foto__id__post } from '../../codegen_output';
import { LectorTapasList } from './LectorTapasList';
import { Modal, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { TapasList } from '../TapasContainer/TapasList';

export const LectorTapasContainer = () => {
  const [lectoresTapasList, setLectoresTapasList] = useState<LectorTapa[]>([]);

  useEffect(() => {
    fetchLectoresTapas();
  }, []);

  const fetchLectoresTapas = () => {
    LectoresDeTapasService.handleReadLectorsTapasPorTerminalBackendApiV1LectoresTapasPorTerminalGet()
      .then((lectoresResponse) => {
        setLectoresTapasList(lectoresResponse);        
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
    <div>
      <Row className="mb-3">
        <Col>
          <LectorTapasList 
            lectoresTapasList={lectoresTapasList}            
          />          
        </Col>
      </Row>

      
    </div>
  );
};