// General Imports
import React, { useEffect, useState } from 'react';

// Component Imports
import Widget from '../Widget/Widget';
import WidgetEditMenu from '../Widget/WidgetEditMenu';
import HealthInfoDisplay from './HealthInfoDisplay';
import HealthInfoEdit from './HealthInfoEdit';

// Util Imports
import { getPetById, getMedicationsByPet } from '../../api';

import type { Pet } from '../../api/pets/types';
import type { Medication } from '../../api/medications/types';

interface Props {
  petId: number;
  onDashboard?: boolean;
}

const HealthWidget: React.FC<Props> = ({ petId, onDashboard }) => {
	const [pet, setPet] = useState<Pet>();
	const [medications, setMedications] = useState<Medication[]>([]);
	const [needsUpdate, setNeedsUpdate] = useState(false);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		getPetById(petId)
			.then((res) => setPet(res.data))
			.catch((err) => console.log(err));
	}, [petId]);

	useEffect(() => {
		getMedicationsByPet(petId)
			.then((res) => setMedications(res.data))
			.catch((err) => console.log(err));

		return () => setNeedsUpdate(false);
	}, [petId, needsUpdate]);

	const editMenu = (
		<WidgetEditMenu type="health" petId={petId} setEditMode={setEditMode} />
	);

	return (
		<>
			{pet && (
				<Widget
					title={onDashboard ? `${pet.name}'s Health` : 'Health'}
					menu={editMenu}
					editMode={editMode}
				>
					{editMode ? (
						<HealthInfoEdit
							pet={pet}
							medications={medications}
							setEditMode={setEditMode}
							setNeedsUpdate={setNeedsUpdate}
						/>
					) : (
						<HealthInfoDisplay medications={medications} />
					)}
				</Widget>
			)}
		</>
	);
};

export default HealthWidget;
