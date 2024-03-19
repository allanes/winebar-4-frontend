import React, { useRef, useState } from 'react';
import { Tapa, TapaConProductoCreate } from '../../codegen_output';
import useNewTapasForm from '../../hooks/useNewTapasForm';
import { Row, Col, Button, Form } from 'react-bootstrap';
import CustomFormField from '../PersonalContainer/CustomFormField';

interface Props {
  tapa: Tapa;
  onUpdateTapa: (updatedTapa: TapaConProductoCreate, fotoFile: File | null) => void;
  tapaImageUrl: string | null;
}

export const TapasUpdate = ({ tapa, onUpdateTapa, tapaImageUrl }: Props) => {
  const [inputValues, dispatch] = useNewTapasForm(tapa);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evt.target

    dispatch({
      type: "change_value",
      payload: {
        inputName: id,
        inputValue: value
      }
    })
  }

  const handleFotoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files && evt.target.files[0];
    setFotoFile(file || null);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onUpdateTapa(inputValues, fotoFile);
    formRef.current?.reset();
    setFotoFile(null);
  };

  return (
    <div className=".table-container-with-img mb-4">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row>
            <Col xs={7}>
                <CustomFormField
                    id="titulo"
                    label="Títutlo"
                    type="string"
                    placeholder="Titulo"
                    onChange={handleChange}
                    value={inputValues.titulo || ''}
                    required
                />          
                <CustomFormField
                    id="precio"
                    label="Precio"
                    type="number"
                    placeholder="Ingrese el precio"
                    onChange={handleChange}
                    value={inputValues.precio || ''}
                    required
                />          
                <CustomFormField
                    id="stock"
                    label="Stock"
                    type="number"
                    placeholder="0"
                    onChange={handleChange}
                    value={inputValues.stock || ''}                  
                />          
                <CustomFormField
                    id="descripcion"
                    label="Descripción"
                    type="string"
                    placeholder="Ingrese la Descripción"
                    onChange={handleChange}
                    value={inputValues.descripcion || ''}                  
                />          
                <Row>
                    <Col xs={2}>
                        <Form.Label>Foto</Form.Label>
                    </Col>
                    <Col xs={5}>
                        <Form.Control type="file" onChange={handleFotoChange}/>
                    </Col>
                </Row>
            </Col>
            <Col md={5} className='image-preview-container'>
                {tapaImageUrl ? (
                    <img src={tapaImageUrl} alt={`Foto de ${tapa.producto.titulo}`} className='image-preview' />
                ) : (
                    <span>Sin imágen</span>
                )}                
            </Col>
        </Row>
            
        <Row>
            <Col className="d-flex justify-content-center">
                <Button type="submit" className="mt-4" size='lg'>
                    Actualizar
                </Button>
            </Col>
        </Row>
 
      </Form>
    </div>
  );
};