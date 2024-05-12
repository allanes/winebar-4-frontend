import React, {useState} from 'react'
import { Turno, TurnosService } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'
import { Badge, Modal, Table } from 'react-bootstrap'
import { handleApiError } from '../ClientsContainer/ClientsContainer'
import TurnoDetalle from './TurnoDetail'
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge'

interface Props {
  turnosList: Array<Turno>
  onDeleteTurno: (id: number) => void
}

const keysTabTurno = [
  "ID",
  "Ordenes",
  // "# de Tapas",
  // "# Usuarios VIP",
  "En Caja",
  "Abierto por",
  "Cerrado por",
  "Abierto",
  "Cerrado",
  ""
]

export const TurnosList = ({ turnosList, onDeleteTurno: onDeleteTurno_propin }: Props) => {
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(null);
  const [showTurnoView, setShowTurnoView] = useState(false);

  const handleDelete = (turno: Turno) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este turno?',
      html: `${turno.id} (${turno.id})`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Turno eliminado!', '', 'error')
        onDeleteTurno_propin(turno.id)
      }
    })
  }

  const handleTurnoClick = async (turnoId: number) => {
    TurnosService.handleReadTurnoByIdBackendApiV1TurnosIdGet(
      turnoId
    ).then((setTurnoResponse) => {
      setSelectedTurno(setTurnoResponse);
      setShowTurnoView(true);
    })
    .catch(handleApiError)
  };

  const handleCloseTurnoView = () => {
    setSelectedTurno(null);
    setShowTurnoView(false);
  };

  return (
    <>
    <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de Turnos</p>
      </div>
      <Table striped hover className='table-container-l'>
        <thead className='table-success'>
          <tr>
            {keysTabTurno.map((item, index) => {
              return (
                <th key={index}>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider' >
          {turnosList.map((turno, index) => {
            return (
              <tr key={index} onClick={() => handleTurnoClick(turno.id)}>
                <th scope='row'>{turno.id}</th>
                <td>{turno.cantidad_de_ordenes}</td>
                {/* <td>{turno.cantidad_tapas}</td> */}
                {/* <td>{turno.cantidad_usuarios_vip}</td> */}
                <td>${turno.monto_en_caja}</td>
                <td>{turno.abierto_por_nombre}</td>
                <td>{turno.cerrado_por_nombre || ''}</td>
                <td><TimestampFormateadoBadge timestamp={turno.timestamp_apertura}/></td>
                <td>{turno.timestamp_cierre ? 
                    <TimestampFormateadoBadge timestamp={turno.timestamp_cierre}/>
                  :
                    <Badge bg='warning'>EN CURSO</Badge>
                  }
                </td>
                                
                <td>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(turno) }} >
                    <img className='icon-img--size' src={deleteIcon} alt="" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Modal show={showTurnoView} onHide={handleCloseTurnoView} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTurno && (
            <TurnoDetalle
              turnoData={selectedTurno} 
              
            />
          )}
        </Modal.Body>
      </Modal>
      </div>
    </>
  )
}
