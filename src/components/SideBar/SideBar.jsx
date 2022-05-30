// General Imports
import React, { useContext } from "react";
import "./SideBar.css";

// Component Imports
import SideBarLink from "../SideBarLink/SideBarLink";
import SideBarDropdown from "../SideBarDropdown/SideBarDropdown";
import SideBarSublink from "../SideBarSublink/SideBarSublink";
import {
  BsHouseDoorFill,
  BsPersonFill,
  BsPlus,
  BsGearWideConnected,
} from "react-icons/bs";
import { FaPaw } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import PetsContext from "../../context/PetsContext";

const SideBar = (props) => {
  const navigate = useNavigate();
  const { pets } = useContext(PetsContext);

  return (
    <div className="sidebar">
      <SideBarLink
        title="Dashboard"
        path="/dashboard"
        icon={<BsHouseDoorFill size={24} />}
      />
      <SideBarDropdown title="My Pets" icon={<FaPaw size={24} />}>
        {pets &&
          pets.map((pet) => {
            return (
              <SideBarSublink
                key={pet.id}
                title={pet.name}
                onClick={() => navigate(`/pets/${pet.id}/`)}
                icon={<FaPaw size={16} />}
              />
            );
          })}
        <SideBarSublink
          title="Add Pet"
          onClick={() => navigate("/addpet")}
          icon={<BsPlus size={24} />}
        />
      </SideBarDropdown>

      <SideBarLink
        title="Settings"
        path="/settings"
        icon={<BsGearWideConnected size={24} />}
      />
    </div>
  );
};

export default SideBar;
