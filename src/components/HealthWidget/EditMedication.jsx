import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import useAxiosGet from "../../hooks/useAxiosGet";

const EditMedication = ({ medication, getMedications }) => {
  const [user, token] = useAuth();
  const [time, setTime] = useState(medication.time);
  const [amount, setAmount] = useState(medication.amount);
  const [units, setUnits] = useState(medication.amount_units);
  const [medicineId, setMedicineId] = useState(medication.medicine.id);

  const [medicineOptions, medOptionsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/medications/medicines/?categoryId=${medication.pet.category}`
  );

  async function handleUpdate(e) {
    e.preventDefault();
    const updatedMed = {
      amount: amount,
      amount_units: units,
      time: time,
      medicine_id: medicineId,
    };
    try {
      await axios.patch(
        "http://127.0.0.1:8000/api/medications/" + medication.id + "/",
        updatedMed,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getMedications();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(
        "http://127.0.0.1:8000/api/medications/" + medication.id + "/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getMedications();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {!medOptionsLoading && (
        <Row>
          <Col>
            <form id={medication.id} onSubmit={handleUpdate}>
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
            <button type="submit" form={medication.id}>
              Save
            </button>
            <button onClick={handleDelete}>Delete</button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default EditMedication;
