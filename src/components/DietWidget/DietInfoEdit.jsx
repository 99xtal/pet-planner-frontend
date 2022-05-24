import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddMeal from "./AddMeal";

import EditMeal from "./EditMeal";

const DietInfoEdit = ({ pet, meals, setEditMode, getMeals }) => {
  const [toggleAdd, setToggleAdd] = useState(false);

  return (
    <>
      <div>
        <Row>
          <Col>
            <p>Next Meal</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Meals</p>
          </Col>
        </Row>
        {meals.map((meal) => (
          <EditMeal key={meal.id} meal={meal} getMeals={getMeals} />
        ))}
        {toggleAdd && <AddMeal pet={pet} getMeals={getMeals} />}
        <Row>
          {!toggleAdd && (
            <Col>
              <button onClick={() => setToggleAdd(true)}>Add Meal</button>
            </Col>
          )}
          <Col>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DietInfoEdit;
