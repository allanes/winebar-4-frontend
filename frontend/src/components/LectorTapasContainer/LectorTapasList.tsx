import React, {useState, useEffect} from 'react'
import { Tapa, TapasService, Producto, TapaConProductoCreate } from '../../codegen_output'
import { LectorTapa, LectoresDeTapasService } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import editIcon from '../../assets/icons/outline_edit_white_24dp.png'
import { handleApiError } from '../ClientsContainer/ClientsContainer'
import { Modal } from 'react-bootstrap'
import { TapasList } from '../TapasContainer/TapasList'
import Swal from 'sweetalert2'

interface Props {
  lectoresTapasList: Array<LectorTapa>
}

const keysTabTapa = [
  "ID",
  "Terminal",
  "Producto id",
  "Puerto"
]

export const LectorTapasList = ({ lectoresTapasList }: Props) => {
  const [selectedLectorTapa, setSelectedLectorTapa] = useState<LectorTapa | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tapasList, setTapasList] = useState<Tapa[]>([]);

  const fetchTapasList = () => {
    TapasService.handleReadTapasBackendApiV1TapasGet()
      .then((tapas) => {
        setTapasList(tapas);        
      })
      .catch(handleApiError);
  };

  const handleOpenUpdateModal = async (lectorTapa: LectorTapa) => {
    setSelectedLectorTapa(lectorTapa);
    try {
      // Fetch the image using the existing service
      fetchTapasList();

    } catch (error) {
      // setTapaImageUrl(null);
    }
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedLectorTapa(null);
    setShowUpdateModal(false);
  };

  const handleTapaSelected = (productId: number) => {
    setShowUpdateModal(false)
    console.log('Tapa elegida para asociar: ' + productId)
    console.log('LectorId elegido: '+ selectedLectorTapa?.id)
    if (selectedLectorTapa) {
      LectoresDeTapasService.handleAsociarLectorConTapaBackendApiV1LectoresTapasCambiarAsociacionTapaPost(
        selectedLectorTapa.id, productId
     )
    }
  }

  return (
    <>
    <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de Lectores de Tapas</p>
      </div>
      <table className='table table-striped table-hover table-container-l'>
        <thead className='table-success'>
          <tr>
            {keysTabTapa.map((item, index) => {
              return (
                <th key={index}>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider' >
          {lectoresTapasList.map((lectorTapa, index) => {
            return (
              <tr key={index} >
                <th scope='row'>{lectorTapa.id}</th>
                <td>{lectorTapa.nombre_terminal}</td>
                <td>
                  {lectorTapa.id_producto}
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
            )
          })}
        </tbody>
      </table>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Elegir Tapa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLectorTapa && 
            <TapasList 
              tapasList={tapasList} 
              onDeleteTapa={(id: number) => {} } 
              onUpdateTapa={(tapa: Tapa) => {}}
              onSelect={handleTapaSelected}
              tablaReducida={true}
            />}
        </Modal.Body>
      </Modal>
      </div>
    </>
  )
}
