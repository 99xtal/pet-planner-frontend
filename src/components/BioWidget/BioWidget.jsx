// General Imports
import React, { useState } from "react";
import "./BioWidget.css";

// Component Imports
import BioWidgetEditMenu from "./BioWidgetEditMenu";
import BioInfoDisplay from "./BioInfoDisplay";
import BioInfoEdit from "./BioInfoEdit";

// Hook Imports
import useAxiosGet from "../../hooks/useAxiosGet";

const BioWidget = ({ petId }) => {
  const [editMode, setEditMode] = useState(false);

  const [pet, petIsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  return (
    <>
      {!petIsLoading && (
        <div className="widget">
          <div className="widget__header">
            <h2 className="widget__title">Bio</h2>
            {!editMode && (
              <BioWidgetEditMenu petId={petId} setEditMode={setEditMode} />
            )}
          </div>
          <div className="widget__body">
            {editMode ? (
              <BioInfoEdit pet={pet} setEditMode={setEditMode} />
            ) : (
              <BioInfoDisplay petId={petId} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BioWidget;
