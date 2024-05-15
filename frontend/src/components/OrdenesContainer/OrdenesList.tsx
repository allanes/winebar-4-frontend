import React, {useState} from 'react';
import { OrdenCompra, OrdenesService, OrdenCompraDetallada } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png';
import { Badge, Col, Row, Button, Modal, Card, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill, FiletypePdf } from 'react-bootstrap-icons';
import OrdenView from './OrdenView';
import { handleApiError } from '../ClientsContainer/ClientsContainer';

interface Props {
  ordenesList: Array<OrdenCompraDetallada>;
  onDeleteOrden: (id: number) => void;
  columnasReducidas?: boolean;
}

const keysTabOrden = [
  'ID',
  // 'Precarga',
  'Monto maximo',
  'turno_id',
  'Cliente',
  'Cargado',
  'Cobrado',
  'Apertura',
  'Cierre',
  'Cerrada Por',
  '',
  ''
];

const keysTabOrdenReducido = [
  'ID',
  // 'Precarga',
  // 'Monto maximo',
  // 'turno_id',
  'Cliente',
  'Cargado',
  'Cobrado',
  'Apertura',
  'Cierre',
  // 'Cerrada Por',
  '',
  ''
];

export const OrdenesList = ({
  ordenesList,
  onDeleteOrden: onDeleteOrden_propin,
  columnasReducidas = false,
}: Props) => {
  const [selectedOrden, setSelectedOrden] = useState<OrdenCompraDetallada | null>(null);
  const [showOrdenView, setShowOrdenView] = useState(false);

  const downloadPDF = async (id: number) => {
    try {
        const response = await fetch(`/backend/api/v1/ordenes/export/order/pdf?id=${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `orden_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(downloadUrl); // Clean up the URL object
        link.remove(); // Ensure the link is removed after use
    } catch (error) {
        console.error('Error downloading the PDF:', error);
        Swal.fire('Error', 'al descargar PDF. Por favor reintentar.', 'error')
        // alert('Error PDF. Please try again.'); // User feedback
    }
};

  

  const handleDelete = (orden: OrdenCompra) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta orden?',
      html: `${orden.id} (${orden.id})`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Orden eliminada!', '', 'error');
        onDeleteOrden_propin(orden.id);
      }
    });
  };

  const handleOrdenClick = async (ordenId: number) => {
    OrdenesService.handleReadOrdenByIdBackendApiV1OrdenesIdGet(
      ordenId
    ).then((ordenDetalladaResponse) => {
      setSelectedOrden(ordenDetalladaResponse);
      setShowOrdenView(true);
    })
    .catch(handleApiError)
  };

  const handleCloseOrdenView = () => {
    setSelectedOrden(null);
    setShowOrdenView(false);
  };

  const selectedKeys = columnasReducidas ? keysTabOrdenReducido : keysTabOrden;

  return (
    <Card className="mb-4 transparent-card">
      <Card.Header as="h3" className='text-center table-container-title'>
        Lista de Ordenes
      </Card.Header>
      <Card.Body>
        <Table striped hover variant='dark'>
            <thead>
              <tr>
                {selectedKeys.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {ordenesList.map((orden, index) => (
                <tr  key={index} onClick={() => handleOrdenClick(orden.id)}>
                  <th scope="row">{orden.id}</th>
                  {/* {!columnasReducidas && <td>{orden.precarga_usada}</td>} */}
                  {!columnasReducidas && <td>{orden.monto_maximo_orden}</td>}
                  {!columnasReducidas && <td>{orden.turno_id}</td>}
                  <td>{orden.nombre_cliente}</td>
                  <td>${orden.monto_cargado}</td>
                  <td><strong>${orden.monto_cobrado}</strong></td>
                  <td><TimestampFormateadoBadge timestamp={orden.timestamp_apertura_orden} /></td>
                  <td>
                    {orden.timestamp_cierre_orden ?
                        <Col>
                          <TimestampFormateadoBadge 
                            timestamp={orden.timestamp_cierre_orden} 
                            variantToRender='success'
                          />
                          <CheckCircleFill color='green' className='ms-1'/>
                        </Col>                        
                    :
                      <Badge bg='danger'>ORDEN ABIERTA</Badge>
                    }
                  </td>
                  {!columnasReducidas && <td>{orden.cerrada_por_nombre}</td>}
                  <td>
                    {!columnasReducidas && 
                      <button
                        className="icons-border icon--size icon--delete"
                        type="button"
                        onClick={() => handleDelete(orden)}
                      >
                        <img className="icon-img--size" src={deleteIcon} alt="" />
                      </button>
                    }
                  </td>
                  <td>
                    {/* {!columnasReducidas &&  */}
                      <button
                        onClick={() => downloadPDF(orden.id)}
                        disabled={!orden.cerrada_por}
                        title={!orden.cerrada_por ? "Order must be closed to download PDF" : "Download PDF"}
                        className="btn btn-primary"
                      >
                        <FiletypePdf/>
                      </button>
                    {/* } */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        
        <Modal show={showOrdenView} onHide={handleCloseOrdenView} centered size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Detalle de Orden</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrden && (
              <OrdenView 
                ordenData={selectedOrden} 
              />
            )}
          </Modal.Body>
        </Modal>
    </Card>
  );
};