import React from 'react';
import './SideBarSublink.css';

interface Props {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const SideBarSublink: React.FC<Props> = ({ title, onClick, icon }) => {
  return (
    <div className="sublink" onClick={onClick}>
      {icon}
      <p>{title}</p>
    </div>
  );
};

export default SideBarSublink;
