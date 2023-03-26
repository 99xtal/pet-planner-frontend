import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBarLink.css';

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const SideBarLink: React.FC<Props> = ({ title, path, icon }) => {
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
