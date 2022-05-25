import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import Widget from "../Widget/Widget";
import WidgetEditMenu from "../Widget/WidgetEditMenu";
import DietInfoDisplay from "./DietInfoDisplay";
import DietInfoEdit from "./DietInfoEdit";
import useAxiosGet from "../../hooks/useAxiosGet";

const DietWidget = ({ petId, onDashboard }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [user, token] = useAuth();
  const [pet, petLoading] = useAxiosGet(
    "http://127.0.0.1:8000/api/pets/" + petId + "/"
  );

  useEffect(() => {
    getMeals();
  }, []);

  const getMeals = async () => {
    setIsLoading(true);
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/meals/?petId=${petId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMeals(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const editMenu = (
    <WidgetEditMenu type="diet" petId={petId} setEditMode={setEditMode} />
  );

  return (
    <>
      {!isLoading && !petLoading && (
        <Widget
          title={onDashboard ? `${pet.name}'s Diet` : "Diet"}
          menu={editMenu}
          editMode={editMode}
        >
          {editMode ? (
            <DietInfoEdit
              pet={pet}
              meals={meals}
              setEditMode={setEditMode}
              getMeals={getMeals}
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
