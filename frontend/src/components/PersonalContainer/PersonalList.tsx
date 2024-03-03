import React from 'react'
import { PersonalInterno } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'

interface Props {
  personalList: Array<PersonalInterno>
  onDeletePersonal: (id: number) => void
}

const keysTabPersonal = [
  "Dni",
  "Nombre Completo",
  // "Fecha de nacimiento",
  "Teléfono",
  // "Email",
  "Activo",
  "Tarjeta",
  "Rol",
  ""
]

export const PersonalList = ({ personalList: personalList, onDeletePersonal: onDeletePersonal }: Props) => {

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
        Swal.fire('Eliminado!', '', 'error')
        onDeletePersonal(personal.id)
      }
    })
  }

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
                <th key={index}>{item}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider' >
          {personalList.map((personal, index) => {
            return (
              <tr key={index} >
                <th scope='row'>{personal.id}</th>
                <td>{personal.nombre} {personal.apellido}</td>                
                <td>{personal.telefono}</td>
                <td>{personal.activa ? "Si" : "No"}</td>
                <td>{personal.tarjeta?.id}</td>
                <td>{personal.tarjeta?.rol.nombre_largo}</td>
                {/* <td>{personal.email}</td> */}
                
                <td>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(personal) }} >
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
