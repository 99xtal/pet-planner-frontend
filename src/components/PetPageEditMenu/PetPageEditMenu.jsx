import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import PetsContext from '../../context/PetsContext';

const PetPageEditMenu = ({ petId, setEditMode }) => {
  const { deletePet } = useContext(PetsContext);

  const handleSelect = (key) => {
    switch (key) {
      case 'rename':
        setEditMode(true);
        break;
      case 'delete':
        deletePet(petId);
        break;
      default:
        console.log('Invalid select event');
    }
  };

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDots size={64} color="white" />
    </a>
  ));

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu>
          <Dropdown.Item eventKey={'rename'}>Rename</Dropdown.Item>
          <Dropdown.Item eventKey={'delete'}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default PetPageEditMenu;
