import React from 'react';
import './Widget.css';

const Widget = ({ title, menu, editMode, children }) => {
  return (
    <div className="widget">
      <div className="widget__header">
        <h2 className="widget__title">{title}</h2>
        {!editMode && menu}
      </div>
      <div className="widget__body">{children}</div>
    </div>
  );
};

export default Widget;
