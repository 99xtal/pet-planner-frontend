import React from "react";
import { Row, Col } from "react-bootstrap";
import MealCountdown from "./MealCountdown";

const DietInfoDisplay = ({ meals, nearestMeal }) => {
  return (
    <>
      <Row>
        <Col>
          <p>Next Meal</p>
        </Col>
      </Row>
      <Row>
        <Col>{/* <MealCountdown nearestMeal={nearestMeal} /> */}</Col>
      </Row>
      <Row>
        <Col>
          <p>Meals</p>
        </Col>
      </Row>
      {meals.map((meal) => (
        <Row key={meal.id}>
          <Col>
            <p>{`${meal.time}, ${meal.amount} ${meal.amount_units} ${meal.food.name}`}</p>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default DietInfoDisplay;
