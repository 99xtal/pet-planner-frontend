import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.css";

const HomePage = ({ pets }) => {
  return (
    <>
      <Row>
        <Navbar />
      </Row>
      <div className="content">
        <SideBar pets={pets} />

        <Outlet />
      </div>

      {/* <h1>Homepage</h1>
        <Link to="dashboard">dashboard</Link>
        {pets.map((pet) => {
          return <Link to={`pets/${pet.id}/`}>{pet.name}</Link>;
        })} */}
    </>
  );
};

export default HomePage;
