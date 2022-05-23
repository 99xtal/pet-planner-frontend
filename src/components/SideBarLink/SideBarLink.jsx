import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBarLink.css";

const SideBarLink = ({ title, path, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebarlink" onClick={() => navigate(path)}>
      {icon}
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default SideBarLink;
