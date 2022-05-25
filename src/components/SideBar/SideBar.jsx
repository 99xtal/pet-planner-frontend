// General Imports
import React from "react";
import "./SideBar.css";

// Component Imports
import SideBarLink from "../SideBarLink/SideBarLink";
import SideBarDropdown from "../SideBarDropdown/SideBarDropdown";
import SideBarSublink from "../SideBarSublink/SideBarSublink";
import { BsHouseDoorFill, BsPersonFill } from "react-icons/bs";
import { FaPaw } from "react-icons/fa";

const SideBar = ({ pets }) => {
  return (
    <div className="sidebar">
      <SideBarLink
        title="Dashboard"
        path="/dashboard"
        icon={<BsHouseDoorFill size={24} />}
      />
      <SideBarDropdown title="My Pets" icon={<FaPaw size={24} />}>
        {pets.map((pet) => {
          return (
            <SideBarSublink
              key={pet.id}
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
