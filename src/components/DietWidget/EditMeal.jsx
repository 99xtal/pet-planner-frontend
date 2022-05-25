import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import useAxiosGet from "../../hooks/useAxiosGet";

const EditMeal = ({ meal, getMeals }) => {
  const [user, token] = useAuth();
  const [time, setTime] = useState(meal.time);
  const [amount, setAmount] = useState(meal.amount);
  const [units, setUnits] = useState(meal.amount_units);
  const [foodId, setFoodId] = useState(meal.food.id);

  const [foodOptions, foodOptionsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/meals/foods/?categoryId=${meal.pet.category}`
  );

  async function handleUpdate(e) {
    e.preventDefault();
    const updatedMeal = {
      amount: amount,
      amount_units: units,
      time: time,
      food_id: foodId,
    };
    try {
      await axios.patch(
        "http://127.0.0.1:8000/api/meals/" + meal.id + "/",
        updatedMeal,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await getMeals();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete("http://127.0.0.1:8000/api/meals/" + meal.id + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await getMeals();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!foodOptionsLoading && (
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
