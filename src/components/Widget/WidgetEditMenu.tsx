import React, { useState, useContext, AnchorHTMLAttributes } from 'react';
import DashboardContext from '../../context/DashboardContext';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';

const WidgetEditMenu = ({ type, petId, setEditMode }) => {
  const { addToDashboard, removeFromDashboard, findOnDashboard } =
    useContext(DashboardContext);
  const [isOnDashboard, setIsOnDashboard] = useState(
    findOnDashboard(type, petId) === undefined ? false : true
  );

  const handleSelect = (key) => {
    switch (key) {
      case 'edit':
        setEditMode((current) => !current);
        break;
      case 'add':
        addToDashboard(type, petId);
        setIsOnDashboard(true);
        break;
      case 'remove':
        removeFromDashboard(type, petId);
        setIsOnDashboard(false);
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
      <BsThreeDots size={24} color={'#707070'} />
    </a>
  ));

  return (
    <>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu>
          <Dropdown.Item eventKey={'edit'}>Edit</Dropdown.Item>
          {isOnDashboard ? (
            <Dropdown.Item eventKey={'remove'}>
              Remove From Dashboard
            </Dropdown.Item>
          ) : (
            <Dropdown.Item eventKey={'add'}>Add to Dashboard</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default WidgetEditMenu;
