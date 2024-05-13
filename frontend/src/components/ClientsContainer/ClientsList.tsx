import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { ClienteWithDetails } from '../../codegen_output';
import { BooleanBadge } from '../BooleanBadge';
import { RolBadge } from '../RolesContainer/RolBadge';
import Swal from 'sweetalert2';
import deleteIcon from '../../assets/icons/outline_delete_white_24dp.png';

interface Props {
  clientsList: Array<ClienteWithDetails>;
  onDeleteClient: (id: number) => void;
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

export const ClientsList = ({ clientsList, onDeleteClient }: Props) => {
  const handleDelete = (client: ClienteWithDetails) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el cliente?',
      text: `${client.nombre}`, // Changed from html to text for simple text display
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      confirmButtonColor: '#ff2d55',
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClient(client.id);
      }
    });
  };

  return (
    <Card className="mb-4 transparent-card">
      <Card.Header as="h3" className='text-center table-container-title'>
        Lista de clientes
      </Card.Header>
      <Card.Body>
        <Table striped hover variant="dark">
          <thead>
            <tr>
              {keysTabClients.map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {clientsList.map((client, index) => (
              <tr key={index}>
                {/* Atributos de Cliente */}
                <td>{client.id}</td>
                <td>{client.nombre}</td>
                {/* Atributos de DetallesAdicionales */}
                <td>{client.detalle?.apellido}</td>
                <td>{client.detalle?.dni}</td>
                {/* Atributos de la Tarjeta */}
                <td>
                  {client.tarjeta && (
                    <RolBadge 
                    key={client.tarjeta.rol.id} 
                    roleName={client.tarjeta.rol.nombre_corto} 
                  />
                  )}
                </td>
                <td><BooleanBadge value={!!client.tarjeta?.entregada} /></td>
                <td><BooleanBadge value={!!client.tarjeta?.presente_en_salon} /></td>
                <td>
                  <button className="btn btn-danger p-0" onClick={() => handleDelete(client)}>
                    <img src={deleteIcon} alt="Delete" className='icon-img--size' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
