import React, { useState } from 'react';
import visibleSvg from '../../assets/visibility.svg';
import visibleOffSvg from '../../assets/visibility_off.svg';
import styles from './PasswordInput.module.scss';

const PasswordInput = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={styles.container}>
      <input
        type={hidden ? 'password' : 'text'}
        className={styles.input}
        {...props}
      />
      <button type='button' className={styles.visibilityButton} onClick={() => setHidden(c => !c)}>
        <img title='visible' height={24} width={24} src={hidden ? visibleSvg : visibleOffSvg}/>
      </button>
    </div>
  );
};

export default PasswordInput;