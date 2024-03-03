import React from 'react'
import { Turno } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'

interface Props {
  turnosList: Array<Turno>
  onDeleteTurno: (id: number) => void
}

const keysTabTurno = [
  "ID",
  "# de Ordenes",
  "# de Tapas",
  "# Usuarios VIP",
  "Ingresos Totales",
  "Abierto por",
  "Cerrado por",
  "Abierta",
  "Cerrada",
  ""
]

export const TurnosList = ({ turnosList, onDeleteTurno: onDeleteTurno_propin }: Props) => {

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
        Swal.fire('Turno eliminada!', '', 'error')
        onDeleteTurno_propin(turno.id)
      }
    })
  }

  return (
    <>
    <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de Turnos</p>
      </div>
      <table className='table table-striped table-hover table-container-l'>
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
              <tr key={index} >
                <th scope='row'>{turno.id}</th>
                <td>{turno.cantidad_de_ordenes}</td>
                <td>{turno.cantidad_tapas}</td>
                <td>{turno.cantidad_usuarios_vip}</td>
                <td>{turno.ingresos_totales}</td>
                <td>{turno.abierto_por}</td>
                <td>{turno.cerrado_por}</td>
                <td>{turno.timestamp_apertura}</td>
                <td>{turno.timestamp_cierre}</td>
                                
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
      </table>
      </div>
    </>
  )
}
