import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import useAxiosGet from "../../hooks/useAxiosGet";

const AddMeal = ({ pet, getMeals }) => {
  const [user, token] = useAuth();
  const [time, setTime] = useState(null);
  const [amount, setAmount] = useState(null);
  const [units, setUnits] = useState(null);
  const [foodId, setFoodId] = useState(null);

  const [foodOptions, foodOptionsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/meals/foods/?categoryId=${pet.category.id}`
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const newMeal = {
      amount: amount,
      amount_units: units,
      time: time,
      food_id: foodId,
      pet_id: pet.id,
    };
    const foodObj = foodOptions.filter((f) => f.id == foodId)[0];
    console.log(foodObj);
    try {
      await axios.post("http://127.0.0.1:8000/api/meals/", newMeal, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      getMeals();
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      {!foodOptionsLoading && (
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
