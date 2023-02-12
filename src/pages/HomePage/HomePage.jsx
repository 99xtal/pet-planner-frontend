import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.css";

const HomePage = (props) => {
  return (
    <>
      <div className="homepage">
        <header>
          <Row>
            <Navbar />
          </Row>
        </header>
        <div className="content">
          <nav>
            <SideBar />
          </nav>
          <main>
            <div className="page">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
