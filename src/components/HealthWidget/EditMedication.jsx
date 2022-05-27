// General Imports
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

// Util Imports
import { patchMedication, deleteMedication } from "../../utils/api";

const EditMedication = ({ medication, setNeedsUpdate, medicineOptions }) => {
  const [time, setTime] = useState(medication.time);
  const [amount, setAmount] = useState(medication.amount);
  const [units, setUnits] = useState(medication.amount_units);
  const [medicineId, setMedicineId] = useState(medication.medicine.id);

  function handleUpdate(e) {
    e.preventDefault();
    const updatedMed = {
      amount: amount,
      amount_units: units,
      time: time,
      medicine_id: medicineId,
    };
    patchMedication(medication.id, updatedMed)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  function handleDelete() {
    deleteMedication(medication.id)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {medicineOptions.length && (
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
