import React from 'react'
import { OrdenCompra } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'

interface Props {
  ordenesList: Array<OrdenCompra>
  onDeleteOrden: (id: number) => void
}

const keysTabOrden = [
  "ID",
  "Precarga",
  "Monto maximo",
  "turno_id",
  "cliente_id",
  "Cobrado",
  "Abierta",
  "Cerrada",
  "Cerrada Por",
  ""
]

export const OrdenesList = ({ ordenesList, onDeleteOrden: onDeleteOrden_propin }: Props) => {

  const handleDelete = (orden: OrdenCompra) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta orden?',
      html: `${orden.id} (${orden.id})`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Orden eliminada!', '', 'error')
        onDeleteOrden_propin(orden.id)
      }
    })
  }

  return (
    <>
    <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de Ordenes</p>
      </div>
      <table className='table table-striped table-hover table-container-l'>
        <thead className='table-success'>
          <tr>
            {keysTabOrden.map((item, index) => {
              return (
                <th key={index}>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider' >
          {ordenesList.map((orden, index) => {
            return (
              <tr key={index} >
                <th scope='row'>{orden.id}</th>
                <td>{orden.precarga_usada}</td>
                <td>{orden.monto_maximo_orden}</td>
                <td>{orden.turno_id}</td>
                <td>{orden.cliente_id}</td>
                <td>{orden.monto_cobrado}</td>
                <td>{orden.timestamp_apertura_orden}</td>
                <td>{orden.timestamp_cierre_orden}</td>
                <td>{orden.cerrada_por}</td>
                                
                <td>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(orden) }} >
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
