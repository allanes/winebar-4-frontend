// AddPersonalButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import addIcon from '../../assets/icons/outline_add_white_24dp.png';

interface Props {
  onClick: () => void;
}

export const AddPersonalButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button  onClick={onClick} className='button-add-entity'>
      <img src={addIcon} alt="Add" className="mr-2" />
      {/* Agregar Personal */}
    </button>
  );
};