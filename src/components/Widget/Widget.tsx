import React from 'react';
import styles from './Widget.module.scss';

interface WidgetProps {
  title?: string;
  menu?: unknown;
  editMode?: boolean;
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, menu, editMode, children }) => {
	return (
		<div className={styles.widget}>
			{/* @ts-ignore */}
			<div className={styles.widget__header}>
				<h2 className={styles.widget__title}>{title}</h2>
				{!editMode && menu}
			</div>
			<div className={styles.widget__body}>{children}</div>
		</div>
	);
};

export default Widget;
