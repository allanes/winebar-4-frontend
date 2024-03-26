import React from 'react';
import { OrdenCompra } from '../../codegen_output';
import TimestampFormateadoBadge from '../Common/TimestampFormateadoBadge';
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png';
import { Badge, Col, Row, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill } from 'react-bootstrap-icons';

interface Props {
  ordenesList: Array<OrdenCompra>;
  onDeleteOrden: (id: number) => void;
  columnasReducidas?: boolean;
}

const keysTabOrden = [
  'ID',
  // 'Precarga',
  'Monto maximo',
  'turno_id',
  'cliente_id',
  'Cargado',
  'Cobrado',
  'Apertura',
  'Cierre',
  'Cerrada Por',
  '',
];

const keysTabOrdenReducido = [
  'ID',
  // 'Precarga',
  // 'Monto maximo',
  // 'turno_id',
  'cliente_id',
  'Cargado',
  'Cobrado',
  'Apertura',
  'Cierre',
  // 'Cerrada Por',
  '',
];

export const OrdenesList = ({
  ordenesList,
  onDeleteOrden: onDeleteOrden_propin,
  columnasReducidas = false,
}: Props) => {
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

  const selectedKeys = columnasReducidas ? keysTabOrdenReducido : keysTabOrden;

  return (
    <>
      <Col className={`justify-content-center`}>
        <Row>
          {!columnasReducidas &&
            <h3 className="text-center mb-1 table-container-xl">Lista de Ordenes</h3>            
          }
        </Row>
        <Row>
          <table className={`table table-striped table-hover table-container-${columnasReducidas ? 'm' : 'xl'}`}>
            <thead className="table-success">
            <tr>
                {selectedKeys.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {ordenesList.map((orden, index) => (
                <tr key={index}>
                  <th scope="row">{orden.id}</th>
                  {/* {!columnasReducidas && <td>{orden.precarga_usada}</td>} */}
                  {!columnasReducidas && <td>{orden.monto_maximo_orden}</td>}
                  {!columnasReducidas && <td>{orden.turno_id}</td>}
                  <td>{orden.cliente_id}</td>
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
                      <Badge bg='danger'>ABIERTA</Badge>
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
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      </Col>
    </>
  );
};