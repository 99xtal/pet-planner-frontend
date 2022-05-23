import React, { useState, useEffect } from "react";
import "./BioWidget.css";
import { Row, Col } from "react-bootstrap";
import useAxiosGet from "../../hooks/useAxiosGet";

const BioWidget = ({ petId }) => {
  const [pet, isLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  return (
    <>
      {!isLoading ? (
        <div className="widget">
          <h2 className="widget__title">Bio</h2>
          <div className="widget__body">
            <Row>
              <Col>
                <Row>
                  <Col>Species:</Col>
                  <Col>{pet.breed.species.binomial_name}</Col>
                </Row>
                <Row>
                  <Col>Breed:</Col>
                  <Col>{pet.breed.name}</Col>
                </Row>
                <Row>
                  <Col>Weight:</Col>
                  <Col>{pet.weight} oz.</Col>
                </Row>
                <Row>
                  <Col>Gender:</Col>
                  <Col>{pet.gender}</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>Birthday:</Col>
                  <Col>{pet.birthday}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BioWidget;
