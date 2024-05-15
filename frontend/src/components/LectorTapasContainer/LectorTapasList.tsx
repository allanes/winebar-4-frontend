import React, { useState, useEffect } from 'react';
import { Tapa, TapasService, Producto, TapaConProductoCreate, LectorTapa, LectoresDeTapasService } from '../../codegen_output';
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png';
import editIcon from '../../assets/icons/outline_edit_white_24dp.png';
import { handleApiError } from '../ClientsContainer/ClientsContainer';
import { Modal, Table } from 'react-bootstrap';
import { TapasList } from '../TapasContainer/TapasList';
import Swal from 'sweetalert2';

interface Props {
  lectoresTapasList: Array<LectorTapa>;
  handleUpdateListado: () => void;
}

const keysTabTapa = [
  "ID",
  "Terminal",
  "Producto id",
  "Nombre",
  "Puerto"
];

export const LectorTapasList = ({ lectoresTapasList, handleUpdateListado }: Props) => {
  const [selectedLectorTapa, setSelectedLectorTapa] = useState<LectorTapa | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tapasList, setTapasList] = useState<Tapa[]>([]);

  useEffect(() => {
    TapasService.handleReadTapasBackendApiV1TapasGet()
      .then(setTapasList)
      .catch(handleApiError);
  }, []);

  const getProductName = (productId: number) => {
    const tapa = tapasList.find(tapa => tapa.producto.id === productId);
    return tapa ? tapa.producto.titulo : 'No disponible';
  };

  const handleOpenUpdateModal = (lectorTapa: LectorTapa) => {
    setSelectedLectorTapa(lectorTapa);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedLectorTapa(null);
    setShowUpdateModal(false);
  };

  const handleTapaSelected = (productId: number) => {
    setShowUpdateModal(false);
    console.log('Tapa elegida para asociar: ' + productId);
    console.log('LectorId elegido: ' + selectedLectorTapa?.id);
    if (selectedLectorTapa) {
      LectoresDeTapasService.handleAsociarLectorConTapaBackendApiV1LectoresTapasCambiarAsociacionTapaPost(
        selectedLectorTapa.id, productId
      ).then(() => {
        handleUpdateListado();
      }).catch(handleApiError);
    }
  };

  return (
    <div >
      <div className='table-container-m text-center mb-1'>
        <p className='h3'>Lista de Lectores de Tapas</p>
      </div>
      <Table striped hover className='table-container-m'>
        <thead>
          <tr>
            {keysTabTapa.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {lectoresTapasList.map((lectorTapa, index) => (
            <tr key={index}>
              <th scope='row'>{lectorTapa.id}</th>
              <td>{lectorTapa.nombre_terminal}</td>
              <td>{lectorTapa.id_producto}</td>
              <td>
                {lectorTapa.id_producto && getProductName(lectorTapa.id_producto)}
                <button className='icons-border icon--size icon--edit me-2'
                    type='button'
                    onClick={() => { handleOpenUpdateModal(lectorTapa) }} 
                  >
                    <img className='icon-img--size' src={editIcon} alt="" />
                  </button>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    // onClick={() => { handleDelete(lectorTapa) }} 
                  >
                    <img className='icon-img--size' src={deleteIcon} alt="" />
                  </button>
              </td>
              <td>{lectorTapa.nombre_puerto}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Elegir Tapa</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex'>
          {selectedLectorTapa && 
            <TapasList 
              tapasList={tapasList} 
              onDeleteTapa={(id: number) => {}}
              onUpdateTapa={(tapa: Tapa) => {}}
              onSelect={handleTapaSelected}
              tablaReducida={true}
            />}
        </Modal.Body>
      </Modal>
    </div>
  );
};
