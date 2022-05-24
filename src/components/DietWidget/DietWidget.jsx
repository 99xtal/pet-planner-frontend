import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import DietWidgetEditMenu from "./DietWidgetEditMenu";
import DietInfoDisplay from "./DietInfoDisplay";
import DietInfoEdit from "./DietInfoEdit";
import useAxiosGet from "../../hooks/useAxiosGet";

const DietWidget = ({ petId }) => {
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

  return (
    <>
      {!isLoading && !petLoading && (
        <div className="widget">
          <div className="widget__header">
            <h2 className="widget__title">Diet</h2>
            {!editMode && (
              <DietWidgetEditMenu petId={petId} setEditMode={setEditMode} />
            )}
          </div>
          <div className="widget__body">
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
          </div>
        </div>
      )}
    </>
  );
};

export default DietWidget;
