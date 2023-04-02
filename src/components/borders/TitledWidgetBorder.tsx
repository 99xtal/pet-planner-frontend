import React from 'react';

import styles from './TitledWidgetBorder.module.scss';

interface Props {
    title: string;
    children: React.ReactNode;
}

const TitledWidgetBorder: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.outerBorder}>
      <div className={styles.header}>
        <h2 className={styles.header__title}>{title}</h2>
      </div>
      <div className={styles.innerBorder}>
        {children}
      </div>
    </div>
  );
};

export default TitledWidgetBorder;