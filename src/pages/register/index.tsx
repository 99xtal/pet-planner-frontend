import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TitledWidgetBorder } from '../../components/borders';
import { RegisterForm } from '../../components/forms';

import AuthContext from '../../context/AuthContext';

import styles from './styles.module.scss';

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  return (
    <div className={styles.main}>
      <TitledWidgetBorder title="Join PetPal">
        <div className={styles.register}>
          <RegisterForm handleSubmit={registerUser}/>
          <p className={styles.register__link}>Already a member? <Link className={styles.register__link} to="/login">Login</Link></p>
        </div>
      </TitledWidgetBorder>
    </div>
  );
};

export default RegisterPage;
