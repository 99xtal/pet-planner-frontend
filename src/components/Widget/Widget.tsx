import React from 'react';
import './Widget.css';

interface WidgetProps {
  title?: string;
  menu?: unknown;
  editMode?: boolean;
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, menu, editMode, children }) => {
  return (
    <div className="widget">
      {/* @ts-ignore */}
      <div className="widget__header">
        <h2 className="widget__title">{title}</h2>
        {!editMode && menu}
      </div>
      <div className="widget__body">{children}</div>
    </div>
  );
};

export default Widget;
