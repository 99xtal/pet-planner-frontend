import React from "react";

// Hook Imports
import { useParams } from "react-router-dom";
import useAxiosGet from "../../hooks/useAxiosGet";

// Component Imports
import BioWidget from "../../components/BioWidget/BioWidget";
import DietWidget from "../../components/DietWidget/DietWidget";
import HealthWidget from "../../components/HealthWidget/HealthWidget";
import TimelineWidget from "../../components/TimelineWidget/TimelineWidget";
import { Container, Row, Col } from "react-bootstrap";

const PetPage = (props) => {
  const { petId } = useParams();
  const [pet, petIsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  return (
    <>
      {!petIsLoading ? (
        <div>
          <Row>
            <Col className="d-flex justify-content-start">
              <h1>{pet.name}</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <BioWidget petId={pet.id} />
              <DietWidget petId={pet.id} />
              <HealthWidget petId={pet.id} />
            </Col>
            <Col>
              <TimelineWidget petId={pet.id} />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default PetPage;
