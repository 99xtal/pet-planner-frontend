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
      <TitledWidgetBorder title="Sign Up">
        <div className={styles.register}>
          <RegisterForm handleSubmit={registerUser}/>
          <Link className={styles.register__link} to="/login">Back to login</Link>
        </div>
      </TitledWidgetBorder>
    </div>
  );
};

export default RegisterPage;
