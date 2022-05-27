import React, { useState } from "react";
import "./PetPage.css";

// Hook Imports
import { useParams } from "react-router-dom";
import useAxiosGet from "../../hooks/useAxiosGet";
import useAuth from "../../hooks/useAuth";

// Component Imports
import BioWidget from "../../components/BioWidget/BioWidget";
import DietWidget from "../../components/DietWidget/DietWidget";
import HealthWidget from "../../components/HealthWidget/HealthWidget";
import TimelineWidget from "../../components/TimelineWidget/TimelineWidget";
import PetPageEditMenu from "../../components/PetPageEditMenu/PetPageEditMenu";
import { Container, Row, Col } from "react-bootstrap";
import { FaDog, FaCat } from "react-icons/fa";
import { GiSandSnake, GiGecko } from "react-icons/gi";
import axios from "axios";

const PetPage = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setRename] = useState("");
  const { petId } = useParams();

  const [pet, petIsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  // async function getPet() {
  //   try {
  //     let response = axios.get(`http://127.0.0.1:8000/api/pets/${petId}/`,)
  //   }
  // }
  const getIcon = (category) => {
    switch (category.toLowerCase()) {
      case "dog":
        return <FaDog size={96} color="white" />;
      case "cat":
        return <FaCat size={96} color="white" />;
      case "snake":
        return <GiSandSnake size={96} color="white" />;
      case "gecko":
      case "lizard":
        return <GiGecko size={96} color="white" />;
      default:
        return null;
    }
  };

  async function updateName() {}

  const handleRename = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <>
      {!petIsLoading ? (
        <div className="petpage">
          <Row>
            <Col className="d-flex justify-content-start">
              <div className="d-flex">
                {getIcon(pet.category.category)}
                {editMode ? (
                  <form onSubmit={handleRename}>
                    <input className="petpage__name"></input>
                    <input type="submit" style={{ display: "none" }} />
                  </form>
                ) : (
                  <h1 className="petpage__name">{pet.name}</h1>
                )}
              </div>
            </Col>
            <Col
              sm={1}
              className="d-flex justify-content-end align-items-center"
            >
              <PetPageEditMenu petId={petId} setEditMode={setEditMode} />
            </Col>
          </Row>

          <Row>
            <Col>
              <BioWidget petId={pet.id} />
              <DietWidget petId={pet.id} />
              <HealthWidget petId={pet.id} />
            </Col>
            <Col className="d-flex align-items-start">
              <TimelineWidget petId={pet.id} />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default PetPage;
