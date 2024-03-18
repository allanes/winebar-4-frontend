import React, { useEffect, useState } from 'react';
import {
  PersonalInterno,
  PersonalInternoService,
  PersonalInternoCreate,
  ApiError,
} from '../../codegen_output';
import { PersonalesCreate } from './PersonalCreate';
import { PersonalList } from './PersonalList';
import { AddPersonalButton } from './AddPersonalButton';
import Swal from 'sweetalert2';
import { Modal, Col, Row } from 'react-bootstrap';

export const PersonalInternoContainer = () => {
  const [personasInternasList, setPersonasInternasList] = useState<PersonalInterno[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPersonalInterno();
  }, []);

  const fetchPersonalInterno = () => {
    PersonalInternoService.handleReadPersonalInternosBackendApiV1PersonalGet()
      .then((usuarios) => {
        setPersonasInternasList(usuarios);
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

  const handleNewPersonal = async (newPersonalIn: PersonalInternoCreate, tarjetaId: number): Promise<void> => {
    try {
      const personalInternoResponse = await PersonalInternoService.handleCreatePersonalInternoBackendApiV1PersonalPost(newPersonalIn);
      const personalInternoWithTarjetaResponse = await PersonalInternoService.handleEntregarTarjetaBackendApiV1PersonalEntregarTarjetaPost({ tarjeta_id: tarjetaId, personal_id: newPersonalIn.id });
      Swal.fire(`${newPersonalIn.nombre}`, 'ha sido guardado con éxito', 'success');
      fetchPersonalInterno();
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await PersonalInternoService.handleDeletePersonalInternoBackendApiV1PersonalIdDelete(id);
      setPersonasInternasList(clients => clients.filter(client => client.id !== id));
      Swal.fire('Success', 'Persona borrada exitosamente.', 'success');
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleAssignTarjeta = async (personalId: number, tarjetaId: number): Promise<void> => {
    try {
      await PersonalInternoService.handleEntregarTarjetaBackendApiV1PersonalEntregarTarjetaPost({ tarjeta_id: tarjetaId, personal_id: personalId });
      Swal.fire('Success', 'Tarjeta asignada exitosamente.', 'success');
      fetchPersonalInterno();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUnassignTarjeta = async (tarjetaId: number): Promise<void> => {
    try {
      await PersonalInternoService.handleDevolverTarjetaBackendApiV1PersonalDevolverTarjetaPost(tarjetaId);
      Swal.fire('Success', 'Tarjeta desasignada exitosamente.', 'success');
      fetchPersonalInterno();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleChangeTarjeta = async (personalId: number, currentTarjetaId: number, newTarjetaId: number): Promise<void> => {
    try {
      await handleUnassignTarjeta(currentTarjetaId);
      await handleAssignTarjeta(personalId, newTarjetaId);
      Swal.fire('Success', 'Tarjeta cambiada exitosamente.', 'success');
      fetchPersonalInterno();
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
          <PersonalList
            personalList={personasInternasList}
            onDeletePersonal={handleDelete}
            onAssignTarjeta={handleAssignTarjeta}
            onUnassignTarjeta={handleUnassignTarjeta}
            onChangeTarjeta={handleChangeTarjeta}
          />
        </Col>
        <Col xs="auto" className='mt-3'>
          <AddPersonalButton onClick={handleOpenModal} />
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Personal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonalesCreate onNewPersonal={handleNewPersonal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};