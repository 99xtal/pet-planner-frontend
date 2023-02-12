import React from "react";
import Navbar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { Row } from "react-bootstrap";
import "./HomePage.css";

const HomePage = () => {
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
