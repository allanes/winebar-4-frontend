import React from 'react'
import { ClienteWithDetails } from '../../codegen_output'
import { BooleanBadge } from '../BooleanBadge'
import { RolBadge } from '../RolesContainer/RolBadge'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'

interface Props {
  clientsList: Array<ClienteWithDetails>
  onDeleteClient: (id: number) => void
}

const keysTabClients = [
  // Atributos del cliente
  "ID",
  "Nombre",
  // Atributos de detalles adicionales
  "Apellido",
  "DNI",
  // Atributos de tarjeta
  "Rol",
  // "Tarjeta",
  "Tarjeta entregada",
  "Tarjeta en salón",
  ""
]

export const ClientsList = ({ clientsList: clientsList, onDeleteClient: onDeleteClient }: Props) => {

  const handleDelete = (client: ClienteWithDetails) => {
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
        // Swal.fire('Eliminado!', '', 'error')
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
          {clientsList.map((clienteData, index) => {
            return (
              <tr key={index} >
                {/* Atributos de Cliente */}
                <th scope='row'>{clienteData.id}</th>
                <td>{clienteData.nombre}</td>
                {/* Atributos de DetallesAdicionales */}
                <td>{clienteData.detalle?.apellido}</td>
                <td>{clienteData.detalle?.dni}</td>
                {/* Atributos de la Tarjeta */}
                <td>
                  {clienteData.tarjeta && 
                    <RolBadge 
                      key={clienteData.tarjeta.rol.id} 
                      roleName={clienteData.tarjeta.rol.nombre_corto} 
                    />
                  }
                </td>
                <td><BooleanBadge value={!!clienteData.tarjeta?.entregada}/></td>
                <td><BooleanBadge value={!!clienteData.tarjeta?.presente_en_salon}/></td>
                <td>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(clienteData) }} >
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
