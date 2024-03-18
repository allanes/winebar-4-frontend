import React, { useEffect, useState } from 'react';
import { Tapa, TapasService, ApiError, TapaConProductoCreate } from '../../codegen_output';
import { Body_handle_upload_foto_backend_api_v1_tapas_foto__id__post } from '../../codegen_output';
// import { PersonalInterno, PersonalInternoService, PersonalInternoCreate, ApiError } from '../../codegen_output';
// import { PersonalesCreate } from './PersonalCreate';
import { TapasList } from './TapasList';
import Swal from 'sweetalert2';
import { TapasCreate } from './TapasCreate';
import { Modal, Row, Col } from 'react-bootstrap';
import { AddPersonalButton } from '../PersonalContainer/AddPersonalButton';


export const TapasContainer = () => {
  const [tapasList, setTapasList] = useState<Tapa[]>([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleNewTapa = async (newTapaIn: TapaConProductoCreate, fotoFile: File | null): Promise<void> => {
    try {
      const response = await TapasService.handleCreateTapaWithTarjetaBackendApiV1TapasPost(newTapaIn);
      
      if (fotoFile) {
        const fotoData: Body_handle_upload_foto_backend_api_v1_tapas_foto__id__post = {
          foto: fotoFile,
        };
        await TapasService.handleUploadFotoBackendApiV1TapasFotoIdPost(response.id, fotoData);
      }
  
      Swal.fire(`${response.producto.titulo}`, `tapa ID ${response.id} guardada.`, 'success');
      fetchTapa();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await TapasService.handleDeleteTapaBackendApiV1TapasIdDelete(id);
      setTapasList(clients => clients.filter(client => client.id !== id));
      Swal.fire('Success', 'Tapa borrada exitosamente.', 'success');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <TapasList 
            tapasList={tapasList} 
            onDeleteTapa={handleDelete} 
          />          
        </Col>
        <Col xs="auto" className='mt-3'>
          <AddPersonalButton onClick={handleOpenModal} />
        </Col>
      </Row>
      

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Tapa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TapasCreate onNewTapa={handleNewTapa} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
