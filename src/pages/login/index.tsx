import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { WidgetBorder } from '../../components/borders';
import { SubmitButton } from '../../components/buttons';
import { PasswordInput, TextInput } from '../../components/input';
import AuthContext from '../../context/AuthContext';
import useCustomForm from '../../hooks/useCustomForm';

import styles from './styles.module.scss';

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: '', password: '' };
  const { formData, handleInputChange, handleSubmit, reset } = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);
  
  return (
    <div className={styles.main}>
      <h1 className={styles.logo__title}>petPal</h1>
      <h3 className={styles.logo__subtitle}>An all-in-one pet planner</h3>
      <WidgetBorder>
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            <div className={styles.login__form}>
              <TextInput
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <PasswordInput
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {isServerError ? (
                <p className="error">Login failed, incorrect credentials!</p>
              ) : null}
              <div className={styles.login__buttons}>
                <SubmitButton>Log In</SubmitButton>
              </div>

            </div>
          </form>
          <Link className={styles.login__buttonsLink} to="/register">Create an account</Link>
        </div>
      </WidgetBorder>
    </div>
  );
};

export default LoginPage;
