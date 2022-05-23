import React from "react";
import { Link } from "react-router-dom";
import SideBarLink from "../SideBarLink/SideBarLink";
import { Container, Row, Col } from "react-bootstrap";
import { BsHouseDoorFill, BsPersonFill } from "react-icons/bs";
import { FaPaw } from "react-icons/fa";
import "./SideBar.css";
import SideBarDropdown from "../SideBarDropdown/SideBarDropdown";
import SideBarSublink from "../SideBarSublink/SideBarSublink";

const SideBar = ({ pets }) => {
  return (
    <div className="sidebar">
      <SideBarLink
        title="Dashboard"
        path="/"
        icon={<BsHouseDoorFill size={24} />}
      />
      <SideBarDropdown title="My Pets" icon={<FaPaw size={24} />}>
        {pets.map((pet) => {
          return (
            <SideBarSublink
              title={pet.name}
              path={`/pets/${pet.id}/`}
              icon={<FaPaw size={16} />}
            />
          );
        })}
      </SideBarDropdown>

      <SideBarLink
        title="Profile"
        path="/profile"
        icon={<BsPersonFill size={24} />}
      />
    </div>
  );
};

export default SideBar;
