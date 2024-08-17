import React, { useState } from 'react';
import { OrdenCompra, OrdenCompraDetallada, OrdenesService } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png';
import { Badge, Col, Row, Button, Table, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill, FiletypePdf } from 'react-bootstrap-icons';
import { handleApiError } from '../ClientsContainer/ClientsContainer';
import OrdenView from './OrdenView';
import { PdfDownloadButton } from './DownloadButton';

interface Props {
  ordenesList: Array<OrdenCompraDetallada>;
  onDeleteOrden: (id: number) => void;
  columnasReducidas?: boolean;
  ordenCobradaTrigger?: () => void;
}

const keysTabOrden = [
  'ID',
  'Monto maximo',
  'turno_id',
  'Cliente',
  'Cargado',
  'Cobrado',
  'Apertura',
  'Cierre',
  'Cerrada Por',
  // '',
  ''
];

const keysTabOrdenReducido = [
  'ID',
  'Cliente',
  'Cargado',
  'Cobrado',
  'Apertura',
  'Cierre',
  // '',
  ''
];

export const OrdenesListBase = ({
  ordenesList,
  onDeleteOrden,
  columnasReducidas = false,
  ordenCobradaTrigger
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
      if (result.isConfirmed) {
        Swal.fire('Orden eliminada!', '', 'error');
        onDeleteOrden(orden.id);
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

  const handleOrdenCobrada = () => {
    handleCloseOrdenView();
    if (ordenCobradaTrigger) {ordenCobradaTrigger()};
  }

  const selectedKeys = columnasReducidas ? keysTabOrdenReducido : keysTabOrden;

  return (
    <>
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
            <tr key={index} onClick={() => handleOrdenClick(orden.id)}>
              <th scope="row">{orden.id}</th>
              {!columnasReducidas && <td>{orden.monto_maximo_orden.toLocaleString('es-ES')}</td>}
              {!columnasReducidas && <td>{orden.turno_id}</td>}
              <td>{orden.nombre_cliente}</td>
              <td>${orden.monto_cargado}</td>
              <td><strong>${orden.monto_cobrado.toLocaleString('es-ES')}</strong></td>
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
                <PdfDownloadButton ordenId={orden.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showOrdenView} onHide={handleCloseOrdenView} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            Detalle de Orden
            {selectedOrden && <PdfDownloadButton ordenId={selectedOrden.id} />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrden && (
            <OrdenView 
              ordenData={selectedOrden} 
              ordenCobradaTrigger={handleOrdenCobrada}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
