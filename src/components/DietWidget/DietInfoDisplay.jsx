// General Imports
import React, { useState, useEffect } from "react";

// Component Imports
import MealCountdown from "./MealCountdown";
import { Row, Col } from "react-bootstrap";

const DietInfoDisplay = ({ meals }) => {
  const [nearestMeal, setNearestMeal] = useState(null);

  useEffect(() => {
    const today = new Date();
    const curHours = today.getHours();
    const curMinutes = today.getMinutes();
    const curSeconds = today.getSeconds();
    const curMs = today.getMilliseconds();
    const todayInMs =
      curHours * 3600000 + curMinutes * 60000 + curSeconds * 1000 + curMs;

    const mealTimes = meals.map((meal) => {
      const mealHours = parseInt(meal.time.slice(0, 2));
      const mealMinutes = parseInt(meal.time.slice(3, 5));
      const mealSeconds = parseInt(meal.time.slice(6, 8));
      let mealTimeInMs =
        mealHours * 3600000 + mealMinutes * 60000 + mealSeconds * 1000;

      if (mealTimeInMs < todayInMs) {
        mealTimeInMs += 86400000;
      }

      return [meal, mealTimeInMs];
    });

    let nearest = [null, 10000000000];
    mealTimes.forEach((mealTime) => {
      if (mealTime[1] < nearest[1]) {
        nearest = mealTime;
      }
    });

    setNearestMeal(nearest[0]);
  }, []);

  return (
    <>
      <Row>
        <Col>
          <p>Next Meal</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {nearestMeal !== null && <MealCountdown nearestMeal={nearestMeal} />}
        </Col>
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
