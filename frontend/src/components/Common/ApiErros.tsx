import React from 'react';
import Swal from 'sweetalert2';
import { ApiError } from '../../codegen_output';

export const handleApiErrorCustom = (error: unknown, onContinue: () => void) => {
    const err = error as ApiError;
    let errorMessage = 'Ocurrió un error.';
    if (err.body && err.body.detail) {
      errorMessage = err.body.detail;
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      allowOutsideClick: false,
      allowEnterKey: true,
      showConfirmButton: false,
      timer: 2300, // Auto close after 5 seconds
    }).then(() => {
      onContinue();
    });
  };