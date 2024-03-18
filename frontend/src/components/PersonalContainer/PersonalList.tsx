import React, { useState } from 'react';
import { PersonalInterno, TarjetasService } from '../../codegen_output';
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png';
import editIcon from '../../assets/icons/outline_edit_white_24dp.png';
import addIcon from '../../assets/icons/outline_add_white_24dp.png';
import { RolBadge } from '../RolesContainer/RolBadge';
import Swal from 'sweetalert2';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import TarjetaInputField from './TarjetaInputField';

interface Props {
  personalList: Array<PersonalInterno>;
  onDeletePersonal: (id: number) => void;
  onAssignTarjeta: (personalId: number, tarjetaId: number) => void;
  onUnassignTarjeta: (tarjetaId: number) => void;
  onChangeTarjeta: (personalId: number, currentTarjetaId: number, newTarjetaId: number) => void;
}

const keysTabPersonal = [
  "Dni",
  "Nombre Completo",
  "Teléfono",
  "Rol/Tarjeta",
  // "Rol",
  ""
];

export const PersonalList = ({ personalList, onDeletePersonal, onAssignTarjeta, onUnassignTarjeta, onChangeTarjeta }: Props) => {
  const [selectedPersonal, setSelectedPersonal] = useState<PersonalInterno | null>(null);
  const [tarjetaId, setTarjetaId] = useState<string>('');

  const handleDelete = (personal: PersonalInterno) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el personal?',
      html: `${personal.nombre}`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Eliminado!', '', 'error')
        onDeletePersonal(personal.id)
      }
    })
  }

  const handleAssignTarjeta = (personal: PersonalInterno) => {
    setSelectedPersonal(personal);
    setTarjetaId('');
  };

  const handleUnassignTarjeta = async (tarjetaId: number) => {
    Swal.fire({
      title: 'La tarjeta se devlverá al bar y quedará libre para ser reasignada. ¿Continuar?',
      html: `${tarjetaId}`,
      showCancelButton: true,
      confirmButtonText: 'Desasociar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55'
    }).then((result) => {
      if (result.isConfirmed) {
          onUnassignTarjeta(tarjetaId);
          setSelectedPersonal(null);
          setTarjetaId('');
        } 
    })
  }

  const handleChangeTarjeta = (personal: PersonalInterno) => {
    setSelectedPersonal(personal);
    setTarjetaId(personal.tarjeta?.id.toString() || '');
  };

  const handleSaveTarjeta = async () => {
    if (selectedPersonal) {
      try {
        if (selectedPersonal.tarjeta) {
          await onChangeTarjeta(selectedPersonal.id, selectedPersonal.tarjeta.id, Number(tarjetaId));
        } else {
          await onAssignTarjeta(selectedPersonal.id, Number(tarjetaId));
        }
        setSelectedPersonal(null);
        setTarjetaId('');
      } catch (error) {
        console.error('Error updating tarjeta:', error);
      }
    }
  };

  const handleModalClose = () => {
    setSelectedPersonal(null);
    setTarjetaId('');
  };

  return (
    <>
      <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de Personal Interno</p>
      </div>
      <table className='table table-striped table-hover table-container-l'>
        <thead className='table-success'>
          <tr>
            {keysTabPersonal.map((item, index) => {
              return (
                <th key={index} className='text-center'>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {personalList.map((personal, index) => (
            <tr key={index}>
              <th scope='row'>{personal.id}</th>
                <td>{personal.nombre} {personal.apellido}</td>                
                <td>{personal.telefono}</td>                
                <td className='text-center align-items-center'>
                  {personal.tarjeta ? (
                    <Row>
                      <Col className='text-end'>
                        <RolBadge 
                          key={personal.tarjeta.rol.id} 
                          roleId={personal.tarjeta.rol.id} 
                          roleName={personal.tarjeta.rol.nombre_corto} 
                        />
                        </Col>
                        <Col className='text-start'>
                          {`(${personal.tarjeta.id})`}
                          <button
                            className='icons-border icon--size icon--delete ms-2'
                            onClick={() => handleUnassignTarjeta(personal.tarjeta?.id || 0)}
                          >
                            <img className='icon-img--size' src={deleteIcon} alt="" />
                          </button>
                          <button 
                            className='icons-border icon--size icon--edit' 
                            onClick={() => handleChangeTarjeta(personal)}>
                            <img className='icon-img--size' src={editIcon} alt="" />
                          </button>                        
                        </Col>
                      </Row>                    
                ) : (
                  <button
                    className='icons-border icon--size icon--add'
                    onClick={() => handleAssignTarjeta(personal)}
                  >
                    <img className='icon-img--size' src={addIcon} alt="" />
                  </button>
                )}
              </td>              
              <td>
              <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(personal) }} >
                    <img className='icon-img--size' src={deleteIcon} alt="" />
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <Modal show={selectedPersonal !== null} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedPersonal && 
            selectedPersonal.tarjeta ? `Actualizar Tarjeta de ${selectedPersonal.nombre}` : `Asignar Tarjeta a ${selectedPersonal?.nombre}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TarjetaInputField
            id="tarjetaId"
            label="ID de Tarjeta"
            placeholder="Ingrese el ID de la tarjeta"
            onChange={(e) => setTarjetaId(e.target.value)}
            value={tarjetaId}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveTarjeta}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};