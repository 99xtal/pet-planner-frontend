import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import EditMedication from "./EditMedication";
import AddMedication from "./AddMedication";

const HealthInfoEdit = ({ pet, medications, setEditMode, getMedications }) => {
  const [addToggled, setAddToggled] = useState(false);

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
            getMedications={getMedications}
          />
        ))}
        {addToggled && (
          <AddMedication pet={pet} getMedications={getMedications} />
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
