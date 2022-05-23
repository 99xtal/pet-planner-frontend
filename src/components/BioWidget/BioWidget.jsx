import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BioWidget.css";
import useAuth from "../../hooks/useAuth";
import { Row, Col } from "react-bootstrap";

const BioWidget = ({ petId }) => {
  const [pet, setPet] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, token] = useAuth();
  const BASE_URL = "http://127.0.0.1:8000/api/pets/";

  useEffect(() => {
    setIsLoaded(false);
    const fetchPet = async () => {
      try {
        let response = await axios.get(BASE_URL + petId + "/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setPet(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchPet();
  }, [token, petId]);

  return (
    <>
      {isLoaded ? (
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
