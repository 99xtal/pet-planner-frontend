import React, { useState, useContext, AnchorHTMLAttributes } from 'react';
import DashboardContext from '../../context/DashboardContext';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import { WidgetOptions } from '../../api/widgets/types';

interface Props {
  petId: number;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const BioWidgetEditMenu: React.FC<Props> = ({ petId, setEditMode }) => {
	const { addToDashboard, removeFromDashboard, findOnDashboard } =
    useContext(DashboardContext);
	const [isOnDashboard, setIsOnDashboard] = useState(
		findOnDashboard(WidgetOptions.BIO, petId) === undefined ? false : true
	);

	const handleSelect = (key: string | null) => {
		switch (key) {
		case 'edit':
			setEditMode((current) => !current);
			break;
		case 'add':
			addToDashboard(WidgetOptions.BIO, petId);
			setIsOnDashboard(true);
			break;
		case 'remove':
			removeFromDashboard(WidgetOptions.BIO, petId);
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

export default BioWidgetEditMenu;
