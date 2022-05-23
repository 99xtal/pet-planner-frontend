import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./SideBar.css";

const SideBar = ({ pets }) => {
  return (
    <div className="sidebar">
      <Container style={{ height: "1000px" }}>
        <Row>
          <Link to="/">Dashboard</Link>
        </Row>
        {pets.map((pet) => {
          return (
            <Row>
              <Link to={`/pets/${pet.id}/`}>{pet.name}</Link>
            </Row>
          );
        })}
        <Row>
          <Link to="/profile">Profile</Link>
        </Row>
      </Container>
    </div>
  );
};

export default SideBar;
