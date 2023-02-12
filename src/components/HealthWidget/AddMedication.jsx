// General Imports
import React, { useState } from 'react';

// Component Imports
import { Row, Col } from 'react-bootstrap';

// Util Imports
import { postMedication } from '../../utils/api';

const AddMedication = ({ pet, setNeedsUpdate, medicineOptions }) => {
  const [time, setTime] = useState(null);
  const [amount, setAmount] = useState(null);
  const [units, setUnits] = useState(null);
  const [medicineId, setMedicineId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const newMed = {
      amount: amount,
      amount_units: units,
      time: time,
      medicine_id: medicineId,
      pet_id: pet.id,
    };
    postMedication(newMed)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {medicineOptions && (
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
                    style={{ width: '100%' }}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Col>
                <Col sm={4}>
                  <select
                    style={{ width: '100%' }}
                    onChange={(e) => setUnits(e.target.value)}
                  >
                    {['pills', 'ccs', 'drops'].map((u) => (
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
