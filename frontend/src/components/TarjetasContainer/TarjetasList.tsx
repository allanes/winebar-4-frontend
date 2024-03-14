import React from 'react'
import { Tarjeta } from '../../codegen_output'
import { RolBadge } from '../RolesContainer/RolBadge'
import { BooleanBadge } from '../BooleanBadge'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'

interface Props {
  tarjetasList: Array<Tarjeta>
  onDeleteTarjeta: (id: number) => void
}

const keysTabTarjeta = [
  "RFID",
  "Activa",
  "Alta",
  "Ultimo Uso",
  "Entregada",
  "En Salón",
  "Monto Precargado",
  "Rol",
  ""
]

export const TarjetasList = ({ tarjetasList, onDeleteTarjeta: onDeleteTarjeta_propin }: Props) => {

  const handleDelete = (tarjeta: Tarjeta) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta tarjeta?',
      html: `${tarjeta.id} (${tarjeta.rol.nombre_largo})`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        onDeleteTarjeta_propin(tarjeta.id)
      }
    })
  }

  return (
    <>
    <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de Tarjetas</p>
      </div>
      <table className='table table-striped table-hover table-container-l' >
        <thead className='table-success'>
          <tr>
            {keysTabTarjeta.map((item, index) => {
              return (
                <th key={index} className='text-center'>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider' >
          {tarjetasList.map((tarjeta, index) => {
            return (
              <tr key={index} >
                <th scope='row'>{tarjeta.id}</th>
                <td>
                  <BooleanBadge value={tarjeta.activa} />
                </td>
                <td>{tarjeta.fecha_alta}</td>
                <td>{tarjeta.fecha_ultimo_uso}</td>
                <td>
                  <BooleanBadge value={tarjeta.entregada} />
                </td>
                <td>
                  <BooleanBadge value={tarjeta.presente_en_salon} />
                </td>
                <td>{tarjeta.monto_precargado}</td>
                <td>
                  <RolBadge 
                    key={tarjeta.rol.id} 
                    roleId={tarjeta.rol.id} 
                    roleName={tarjeta.rol.nombre_corto} 
                  />
                </td>
                                
                <td>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(tarjeta) }} >
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
