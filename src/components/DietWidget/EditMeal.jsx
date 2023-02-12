// General Imports
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

// Util Imports
import { patchMeal, deleteMeal } from "../../utils/api";

const EditMeal = ({ meal, setNeedsUpdate, foodOptions }) => {
  const [time, setTime] = useState(meal.time);
  const [amount, setAmount] = useState(meal.amount);
  const [units, setUnits] = useState(meal.amount_units);
  const [foodId, setFoodId] = useState(meal.food.id);

  function handleUpdate(e) {
    e.preventDefault();
    const updatedMeal = {
      amount: amount,
      amount_units: units,
      time: time,
      food_id: foodId,
    };
    patchMeal(meal.id, updatedMeal)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  function handleDelete() {
    deleteMeal(meal.id)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {foodOptions.length && (
        <Row>
          <Col>
            <form id={meal.id} onSubmit={handleUpdate}>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <Row>
                <Col sm={8}>
                  <input
                    style={{ width: "100%" }}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Col>
                <Col sm={4}>
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => setUnits(e.target.value)}
                  >
                    {["g", "kg", "cups", "whole"].map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <select onChange={(e) => setFoodId(e.target.value)}>
                {foodOptions.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </form>
          </Col>
          <Col>
            <button type="submit" form={meal.id}>
              Save
            </button>
            <button onClick={handleDelete}>Delete</button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default EditMeal;
