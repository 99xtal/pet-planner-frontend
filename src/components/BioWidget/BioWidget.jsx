// General Imports
import React, { useState } from "react";
import "./BioWidget.css";

// Component Imports
import Widget from "../Widget/Widget";
import WidgetEditMenu from "../Widget/WidgetEditMenu";
import BioInfoDisplay from "./BioInfoDisplay";
import BioInfoEdit from "./BioInfoEdit";

// Hook Imports
import useAxiosGet from "../../hooks/useAxiosGet";

const BioWidget = ({ petId, onDashboard }) => {
  const [editMode, setEditMode] = useState(false);

  const [pet, petIsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  const editMenu = (
    <WidgetEditMenu type="bio" petId={petId} setEditMode={setEditMode} />
  );

  return (
    <>
      {!petIsLoading && (
        <Widget
          title={onDashboard ? `${pet.name}'s Bio` : "Bio"}
          menu={editMenu}
          editMode={editMode}
        >
          {editMode ? (
            <BioInfoEdit pet={pet} setEditMode={setEditMode} />
          ) : (
            <BioInfoDisplay petId={petId} />
          )}
        </Widget>
      )}
    </>
  );
};

export default BioWidget;
