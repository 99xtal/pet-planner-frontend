import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBarSublink.css";

const SideBarSublink = ({ title, path, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="sublink" onClick={() => navigate(path)}>
      {icon}
      <p>{title}</p>
    </div>
  );
};

export default SideBarSublink;
