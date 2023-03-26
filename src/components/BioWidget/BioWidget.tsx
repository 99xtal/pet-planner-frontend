// General Imports
import React, { useState, useEffect } from 'react';

// Component Imports
import Widget from '../Widget/Widget';
import WidgetEditMenu from '../Widget/WidgetEditMenu';
import BioInfoDisplay from './BioInfoDisplay';
import BioInfoEdit from './BioInfoEdit';

import { getPetById } from '../../api';

import type { Pet } from '../../api/pets/types';

interface Props {
  petId: number;
  onDashboard?: boolean;
}

const BioWidget: React.FC<Props> = ({ petId, onDashboard }) => {
  const [pet, setPet] = useState<Pet>();
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPetById(petId)
      .then((res) => setPet(res.data))
      .catch((err) => console.log(err));

    return () => setNeedsUpdate(false);
  }, [petId, needsUpdate]);

  const editMenu = (
    <WidgetEditMenu type="bio" petId={petId} setEditMode={setEditMode} />
  );

  return (
    <>
      {pet && (
        <Widget
          title={onDashboard ? `${pet.name}'s Bio` : 'Bio'}
          menu={editMenu}
          editMode={editMode}
        >
          {editMode ? (
            <BioInfoEdit
              pet={pet}
              setEditMode={setEditMode}
              setNeedsUpdate={setNeedsUpdate}
            />
          ) : (
            <BioInfoDisplay pet={pet} />
          )}
        </Widget>
      )}
    </>
  );
};

export default BioWidget;
