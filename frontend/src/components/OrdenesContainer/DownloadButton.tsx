import React from 'react';
import { FiletypePdf } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';

interface Props {
  ordenId: number;
}

export const PdfDownloadButton = ({
  ordenId
}: Props) => {

  const downloadPDF = async () => {
    try {
        const response = await fetch(`/backend/api/v1/ordenes/export/order/pdf?id=${ordenId}`, {
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
        link.setAttribute('download', `orden_${ordenId}.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(downloadUrl); // Clean up the URL object
        link.remove(); // Ensure the link is removed after use
    } catch (error) {
        console.error('Error downloading the PDF:', error);
        Swal.fire('Error', 'al descargar PDF. Por favor reintentar.', 'error')
    }
  };


  return (
    <button
        onClick={() => downloadPDF()}
        // disabled={!orden.cerrada_por}
        // title={!orden.cerrada_por ? "Order must be closed to download PDF" : "Download PDF"}
        title="Descargar PDF"
        className="btn btn-primary"
    >
        <FiletypePdf/>
    </button>
  );
};
