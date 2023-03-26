import React, { AnchorHTMLAttributes } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';

import { deleteEvent } from '../../api';

const EventMenu = ({ eventId, setEditMode, setNeedsRefresh }) => {
  const CustomToggle = React.forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(({ onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      <BsThreeDots size={16} color={'#707070'} />
    </a>
  ));

  const handleDelete = () => {
    deleteEvent(eventId)
      .then(() => setNeedsRefresh(true))
      .catch((err) => console.log(err));
  };

  const handleSelect = (key) => {
    switch (key) {
      case 'edit':
        setEditMode((current) => !current);
        break;
      case 'delete':
        handleDelete();
        break;
      default:
        console.log('Invalid select event');
    }
  };

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu>
          <Dropdown.Item eventKey={'edit'}>Edit</Dropdown.Item>
          <Dropdown.Item eventKey={'delete'}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default EventMenu;
