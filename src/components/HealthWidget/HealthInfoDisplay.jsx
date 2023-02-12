// General Imports
import React, { useState, useEffect } from 'react';

// Component Imports
// import MedicationCountdown from "./MedicationCountdown";
import { Row, Col } from 'react-bootstrap';

const HealthInfoDisplay = ({ medications }) => {
  const [, setNearestMed] = useState(null);

  useEffect(() => {
    const today = new Date();
    const curHours = today.getHours();
    const curMinutes = today.getMinutes();
    const curSeconds = today.getSeconds();
    const curMs = today.getMilliseconds();
    const todayInMs =
      curHours * 3600000 + curMinutes * 60000 + curSeconds * 1000 + curMs;

    const medTimes = medications.map((med) => {
      const medHours = parseInt(med.time.slice(0, 2));
      const medMinutes = parseInt(med.time.slice(3, 5));
      const medSeconds = parseInt(med.time.slice(6, 8));
      let medTimeInMs =
        medHours * 3600000 + medMinutes * 60000 + medSeconds * 1000;

      if (medTimeInMs < todayInMs) {
        medTimeInMs += 86400000;
      }

      return [med, medTimeInMs];
    });

    let nearest = [null, 10000000000];
    medTimes.forEach((medTime) => {
      if (medTime[1] < nearest[1]) {
        nearest = medTime;
      }
    });

    setNearestMed(nearest[0]);
  }, []);

  return (
    <>
      <Row>
        <Col>
          <p>Next Medication</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* {nearestMed !== null && (
            <MedicationCountdown nearestMed={nearestMed} />
          )} */}
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Medications</p>
        </Col>
      </Row>
      {medications.map((med) => (
        <Row key={med.id}>
          <Col>
            <p>{`${med.time}, ${med.amount} ${med.amount_units} ${med.medicine.name}`}</p>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default HealthInfoDisplay;
