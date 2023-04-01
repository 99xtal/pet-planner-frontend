import React, { AnchorHTMLAttributes, useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import PetsContext from '../../context/PetsContext';

interface Props {
  petId: number;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PetPageEditMenu: React.FC<Props> = ({ petId, setEditMode }) => {
  const { deletePet } = useContext(PetsContext);

  const handleSelect = (key: string | null) => {
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

  const CustomToggle = React.forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(({ onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
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
