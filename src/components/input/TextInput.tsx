import React from 'react';

import styles from './TextInput.module.scss';

const TextInput = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <input
      type="text"
      className={styles.input}
      {...props}
    />
  );
};

export default TextInput;