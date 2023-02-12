import React from 'react';
import './SideBarSublink.css';

const SideBarSublink = ({ title, onClick, icon }) => {
  return (
    <div href="#0" className="sublink" onClick={onClick}>
      {icon}
      <p>{title}</p>
    </div>
  );
};

export default SideBarSublink;
