// General Imports
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

// Util Imports
import { postMeal } from "../../utils/api";

const AddMeal = ({ pet, setNeedsUpdate, foodOptions }) => {
  const [time, setTime] = useState(null);
  const [amount, setAmount] = useState(null);
  const [units, setUnits] = useState(null);
  const [foodId, setFoodId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const newMeal = {
      amount: amount,
      amount_units: units,
      time: time,
      food_id: foodId,
      pet_id: pet.id,
    };
    postMeal(newMeal)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {foodOptions.length && (
        <Row>
          <Col>
            <form id="addmeal" onSubmit={handleSubmit}>
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
            <button type="submit" form="addmeal">
              Save
            </button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AddMeal;
