import React from "react";
import { Row, Col } from "react-bootstrap";
import useAxiosGet from "../../hooks/useAxiosGet";

const BioInfoDisplay = ({ petId }) => {
  const [pet, isLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  return (
    !isLoading && (
      <Row>
        <Col>
          <Row>
            <Col>Breed:</Col>
            <Col>{pet.breed.name}</Col>
          </Row>
          <Row>
            <Col>Species:</Col>
            <Col>{pet.breed.species.binomial_name}</Col>
          </Row>
          <Row>
            <Col>Weight:</Col>
            <Col>{pet.weight} oz.</Col>
          </Row>
          <Row>
            <Col>Gender:</Col>
            <Col>{pet.gender}</Col>
          </Row>
          <Row>
            <Col>Birthday:</Col>
            <Col>{pet.birthday}</Col>
          </Row>
        </Col>
      </Row>
    )
  );
};

export default BioInfoDisplay;
