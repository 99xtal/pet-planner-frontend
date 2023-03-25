// General Imports
import React, { useState, useEffect } from 'react';

// Component Imports
import EditMedication from './EditMedication';
import AddMedication from './AddMedication';
import { Row, Col } from 'react-bootstrap';

// Util Imports
import { getMedicinesByCategory } from '../../api';

const HealthInfoEdit = ({ pet, medications, setEditMode, setNeedsUpdate }) => {
  const [addToggled, setAddToggled] = useState(false);
  const [medicineOptions, setMedicineOptions] = useState([]);

  useEffect(() => {
    getMedicinesByCategory(pet.category.id)
      .then((res) => setMedicineOptions(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <Row>
          <Col>
            <p>Next Meal</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Meals</p>
          </Col>
        </Row>
        {medications.map((med) => (
          <EditMedication
            key={med.id}
            medication={med}
            setNeedsUpdate={setNeedsUpdate}
            medicineOptions={medicineOptions}
          />
        ))}
        {addToggled && (
          <AddMedication
            pet={pet}
            setNeedsUpdate={setNeedsUpdate}
            medicineOptions={medicineOptions}
          />
        )}
        <Row>
          {!addToggled && (
            <Col>
              <button onClick={() => setAddToggled(true)}>
                Add Medication
              </button>
            </Col>
          )}
          <Col>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HealthInfoEdit;
