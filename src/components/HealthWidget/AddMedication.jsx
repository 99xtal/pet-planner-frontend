import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import useAxiosGet from "../../hooks/useAxiosGet";

const AddMedication = ({ pet, getMedications }) => {
  const [user, token] = useAuth();
  const [time, setTime] = useState(null);
  const [amount, setAmount] = useState(null);
  const [units, setUnits] = useState(null);
  const [medicineId, setMedicineId] = useState(null);

  const [medicineOptions, medOptionsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/medications/medicines/?categoryId=${pet.category.id}`
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const newMed = {
      amount: amount,
      amount_units: units,
      time: time,
      medicine_id: medicineId,
      pet_id: pet.id,
    };
    try {
      await axios.post("http://127.0.0.1:8000/api/medications/", newMed, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      getMedications();
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      {!medOptionsLoading && (
        <Row>
          <Col>
            <form id="addmed" onSubmit={handleSubmit}>
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
                    {["pills", "ccs", "drops"].map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              <select onChange={(e) => setMedicineId(e.target.value)}>
                {medicineOptions.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </form>
          </Col>
          <Col>
            <button type="submit" form="addmed">
              Save
            </button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AddMedication;
