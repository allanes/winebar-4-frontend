// useOrdenCompraInfoPagoForm.tsx
import { useState } from 'react';
import { OrdenCompraInfoPago } from '../codegen_output';

const useOrdenCompraInfoPagoForm = (onSubmit: (infoPago: OrdenCompraInfoPago) => void) => {
    const [form, setForm] = useState<OrdenCompraInfoPago>({
        cobrado_efectivo: null,
        cobrado_tarjeta: null,
        cobrado_transferencia: null,
        comentarios: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === 'comentarios' ? value : value !== '' ? parseFloat(value) : null,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return { form, handleChange, handleSubmit };
};

export default useOrdenCompraInfoPagoForm;