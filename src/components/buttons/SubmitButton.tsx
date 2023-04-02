import React from 'react';
import spinnerSvg from '../../assets/loading_dots.svg';
import styles from './SubmitButton.module.scss';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading: boolean;
}

const SubmitButton: React.FC<Props> = ({ loading, ...props}) => {
  if (loading) {
    return <div className={styles.button}><img height={36} width={36} src={spinnerSvg} /></div>;
  }
  return <button {...props} className={styles.button} />;
};

export default SubmitButton;