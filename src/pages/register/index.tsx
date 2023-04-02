import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/forms';

import Widget from '../../components/Widget/Widget';
import AuthContext from '../../context/AuthContext';

import styles from './styles.module.scss';

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  return (
    <div className={styles.main}>
      <Widget title="New Account">
        <div className={styles.register}>
          <RegisterForm handleSubmit={registerUser}/>
          <Link className={styles.register__link} to="/login">Back to login</Link>
        </div>
      </Widget>
    </div>
  );
};

export default RegisterPage;
