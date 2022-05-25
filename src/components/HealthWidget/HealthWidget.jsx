import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosGet from "../../hooks/useAxiosGet";

import Widget from "../Widget/Widget";
import WidgetEditMenu from "../Widget/WidgetEditMenu";
import HealthInfoDisplay from "./HealthInfoDisplay";
import HealthInfoEdit from "./HealthInfoEdit";

const HealthWidget = ({ petId, onDashboard }) => {
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [user, token] = useAuth();
  const [pet, petLoading] = useAxiosGet(
    "http://127.0.0.1:8000/api/pets/" + petId + "/"
  );

  useEffect(() => {
    getMedications();
  }, []);

  async function getMedications() {
    setIsLoading(true);
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/medications/?petId=${petId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMedications(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  }

  const editMenu = (
    <WidgetEditMenu type="health" petId={petId} setEditMode={setEditMode} />
  );

  return (
    <>
      {!isLoading && !petLoading && (
        <Widget
          title={onDashboard ? `${pet.name}'s Health` : "Health"}
          menu={editMenu}
          editMode={editMode}
        >
          {editMode ? (
            <HealthInfoEdit
              pet={pet}
              medications={medications}
              setEditMode={setEditMode}
              getMedications={getMedications}
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
