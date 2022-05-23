import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./SideBarDropdown.css";

const SideBarDropdown = ({ title, icon, children }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="sidebardropdown" onClick={() => setToggled(!toggled)}>
      <div className="dropdown__header">
        {icon}
        <p>{title}</p>
      </div>
      {toggled ? children : null}
    </div>
  );
};

export default SideBarDropdown;
