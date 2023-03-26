// General Imports
import React, { useEffect, useState } from 'react';

// Component Imports
import Widget from '../Widget/Widget';
import WidgetEditMenu from '../Widget/WidgetEditMenu';
import DietInfoDisplay from './DietInfoDisplay';
import DietInfoEdit from './DietInfoEdit';

// Util Imports
import { getPetById, getMealsByPet } from '../../api';

import type { Pet } from '../../api/services/pets/types';
import type { Meal } from '../../api/services/meals/types';

interface Props {
  petId: number;
  onDashboard?: boolean;
}

const DietWidget: React.FC<Props> = ({ petId, onDashboard }) => {
  const [pet, setPet] = useState<Pet>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    getPetById(petId)
      .then((res) => setPet(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getMealsByPet(petId)
      .then((res) => setMeals(res.data))
      .catch((err) => console.log(err));

    return () => setNeedsUpdate(false);
  }, [petId, needsUpdate]);

  const editMenu = (
    <WidgetEditMenu type="diet" petId={petId} setEditMode={setEditMode} />
  );

  return (
    <>
      {pet && (
        <Widget
          title={onDashboard ? `${pet.name}'s Diet` : 'Diet'}
          menu={editMenu}
          editMode={editMode}
        >
          {editMode ? (
            <DietInfoEdit
              pet={pet}
              meals={meals}
              setEditMode={setEditMode}
              setNeedsUpdate={setNeedsUpdate}
            />
          ) : (
            <DietInfoDisplay meals={meals} />
          )}
        </Widget>
      )}
    </>
  );
};

export default DietWidget;
