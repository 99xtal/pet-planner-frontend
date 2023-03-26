import React from 'react';

import Widget from '../Widget/Widget';
import AddPetForm from './AddPetForm';

const AddPetModal = () => {
  return (
    <div className="addpetmodal">
      <Widget title="Add Pet">
        <AddPetForm />
      </Widget>
    </div>
  );
};

export default AddPetModal;
