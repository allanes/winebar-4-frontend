import React from 'react'
import { Cliente } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'

interface Props {
  clientsList: Array<Cliente>
  onDeleteClient: (id: number) => void
}

const keysTabClients = [
  "Nombre",
  "Tarjeta",
  ""
]

export const ClientsList = ({ clientsList: clientsList, onDeleteClient: onDeleteClient }: Props) => {

  const handleDelete = (client: Cliente) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el cliente?',
      html: `${client.nombre}`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'error')
        onDeleteClient(client.id)
      }
    })
  }

  return (
    <>
    <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de clientes</p>
      </div>
      <table className='table table-striped table-hover table-container-l'>
        <thead className='table-success'>
          <tr>
            {keysTabClients.map((item, index) => {
              return (
                <th key={index}>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider' >
          {clientsList.map((patient, index) => {
            return (
              <tr key={index} >
                <th scope='row'>{patient.id}</th>
                <td>{patient.nombre}</td>                
                {/* <td>{patient.email}</td> */}
                <td>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(patient) }} >
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
