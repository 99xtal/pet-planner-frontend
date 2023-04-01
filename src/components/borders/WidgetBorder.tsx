import React from 'react';

import styles from './WidgetBorder.module.scss';

interface Props {
    children: React.ReactNode;
}

const WidgetBorder: React.FC<Props> = ({ children }) => {
	return (
		<div className={styles.outerBorder}>
			<div className={styles.innerBorder}>
				{children}
			</div>
		</div>
	);
};

export default WidgetBorder;