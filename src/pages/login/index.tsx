import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WidgetBorder } from '../../components/borders';
import Widget from '../../components/Widget/Widget';
import AuthContext from '../../context/AuthContext';
import useCustomForm from '../../hooks/useCustomForm';
import styles from './styles.module.css';

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
    <div className={styles.login__body}>
      <h1 className={styles.logo__title}>petPal</h1>
      <h3 className={styles.logo__subtitle}>An all-in-one pet planner</h3>
      <WidgetBorder>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form}>
            <input
              type="text"
              className={styles.login__formInput}
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              className={styles.login__formInput}             
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}
            <div className={styles.login__buttons}>
              <button className={styles.login__formButton}>Log In</button>
              <Link className={styles.login__buttonsLink} to="/register">Create an account</Link>
            </div>
          </div>
        </form>
      </WidgetBorder>
    </div>
  );
};

export default LoginPage;
