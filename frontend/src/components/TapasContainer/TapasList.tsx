import React from 'react'
import { Tapa, Producto, TapaConProductoCreate } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import Swal from 'sweetalert2'

interface Props {
  tapasList: Array<Tapa>
  onDeleteTapa: (id: number) => void
}

const keysTabTapa = [
  "ID",
  "Ttitulo",
  "Descripcion",
  "Precio",
  "Stock",
  "Foto",
  ""
]

export const TapasList = ({ tapasList, onDeleteTapa: onDeleteTapa_propin }: Props) => {

  const handleDelete = (tapa: Tapa) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta tapa?',
      html: `${tapa.id} (${tapa.producto.titulo})`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Tapa eliminada!', '', 'error')
        onDeleteTapa_propin(tapa.id)
      }
    })
  }

  return (
    <>
    <div className='table-container-xl'>
      <div className='table-container-l text-center mb-1'>
        <p className='h3'>Lista de Tapas</p>
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
          {tapasList.map((tapa, index) => {
            return (
              <tr key={index} >
                <th scope='row'>{tapa.id}</th>
                <td>{tapa.producto.titulo}</td>
                <td>{tapa.producto.descripcion}</td>
                <td>{tapa.producto.precio}</td>
                <td>{tapa.producto.stock}</td>
                <td>{tapa.foto}</td>
                {/* <td>{tapa.foto}</td> */}
                                
                <td>
                  <button className='icons-border icon--size icon--delete'
                    type='button'
                    onClick={() => { handleDelete(tapa) }} >
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
