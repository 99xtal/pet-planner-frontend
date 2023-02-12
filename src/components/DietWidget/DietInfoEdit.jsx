// General Imports
import React, { useState, useEffect } from 'react';

// Component Imports
import AddMeal from './AddMeal';
import EditMeal from './EditMeal';
import { Row, Col } from 'react-bootstrap';

// Util Imports
import { getFoodsByCategory } from '../../utils/api';

const DietInfoEdit = ({ pet, meals, setEditMode, setNeedsUpdate }) => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [foodOptions, setFoodOptions] = useState([]);

  useEffect(() => {
    getFoodsByCategory(pet.category.id)
      .then((res) => setFoodOptions(res.data))
      .catch((err) => console.log(err));
  }, [pet.category]);

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
        {foodOptions.length &&
          meals.map((meal) => (
            <EditMeal
              key={meal.id}
              meal={meal}
              setNeedsUpdate={setNeedsUpdate}
              foodOptions={foodOptions}
            />
          ))}
        {foodOptions.length && toggleAdd && (
          <AddMeal
            pet={pet}
            setNeedsUpdate={setNeedsUpdate}
            foodOptions={foodOptions}
          />
        )}
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
