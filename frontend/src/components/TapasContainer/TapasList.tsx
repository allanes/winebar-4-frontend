import React, {useState, useEffect} from 'react'
import { Tapa, TapasService, Producto, TapaConProductoCreate } from '../../codegen_output'
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png'
import editIcon from '../../assets/icons/outline_edit_white_24dp.png'
import Swal from 'sweetalert2'
import { Table } from 'react-bootstrap'

interface Props {
  tapasList: Array<Tapa>
  onDeleteTapa: (id: number) => void
  onUpdateTapa: (tapa: Tapa) => void
  onSelect?: (productId: number) => void
  tablaReducida?: boolean
}

const keysTabTapa = [
  "ID",
  "Foto",
  "Ttitulo",
  "Descripcion",
  "Precio",
  "Stock",
  "",
  ""
]

export const TapasList = ({ 
  tapasList, 
  onDeleteTapa, 
  onUpdateTapa, 
  onSelect, 
  tablaReducida = false 
}: Props) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchImages = async () => {
      const newImages: { [key: number]: string } = {};
      const fetchPromises = tapasList.map(async (tapa) => {
        if (tapa.foto) {
          try {
            // Make sure the response is treated as a blob
            const response = await TapasService.handleGetFotoBackendApiV1TapasFotoIdGet(tapa.id);
            if (response instanceof Blob) {
              const imageUrl = URL.createObjectURL(response);
              newImages[tapa.id] = imageUrl;
            } else {
              console.error('Response is not a Blob:', response);
            }
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        }
      });
  
      // Wait for all the images to be fetched before updating the state
      await Promise.all(fetchPromises);
      setLoadedImages(newImages);
    };
  
    fetchImages();
    // Clean up the object URLs when the component unmounts.
    return () => {
      Object.values(loadedImages).forEach(URL.revokeObjectURL);
    };
    // Only run this effect on component mount and when tapasList changes.
  }, [tapasList]);
  
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
        Swal.fire('Tapa eliminada!', '', 'success')
        onDeleteTapa(tapa.id)
      }
    })
  }

  const handleEdit = (tapa: Tapa) => {
    onUpdateTapa(tapa)
  }

  return (
    <>
    <div className={`table-container-${tablaReducida ? "s" : "xl"}`}>
      <div className={`text-center mb-1`}>
        <p className='h3'>Lista de Tapas</p>
      </div>
      <Table striped hover className=''>
        <thead className='table-success'>
          <tr>
            {keysTabTapa.map((item, index) => {
              if (tablaReducida && (item === "" || item === "Descripcion")) return null;  // Skip rendering icon headers
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody className='table-group-divider' >
          {tapasList.map((tapa, index) => {
            return (
              <tr key={index} onClick={() => onSelect?.(tapa.producto.id)}>
                <th scope='row'>{tapa.id}</th>
                <td>
                  {tapa.foto &&
                    <img src={loadedImages[tapa.id]} alt="Tapa" style={{ height: '50px' }} /> 
                  }
                </td>
                <td>{tapa.producto.titulo}</td>
                {!tablaReducida && (
                  <td>{tapa.producto.descripcion}</td>
                )}
                <td>{tapa.producto.precio}</td>
                <td>{tapa.producto.stock}</td>
                {!tablaReducida && (
                  <td>
                    <button className='icons-border icon--size icon--edit' type='button' onClick={(e) => {
                      e.stopPropagation();  // Prevent triggering row's onClick
                      handleEdit(tapa);
                    }}>
                      <img className='icon-img--size' src={editIcon} alt="" />
                    </button>
                  </td>
                )}
                {!tablaReducida && (
                  <td>
                    <button className='icons-border icon--size icon--delete' type='button' onClick={(e) => {
                      e.stopPropagation();  // Prevent triggering row's onClick
                      handleDelete(tapa);
                    }}>
                      <img className='icon-img--size' src={deleteIcon} alt="" />
                    </button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </Table>
      </div>
    </>
  )
}
