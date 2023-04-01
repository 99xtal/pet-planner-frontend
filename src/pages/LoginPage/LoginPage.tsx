import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import AuthContext from '../../context/AuthContext';
import useCustomForm from '../../hooks/useCustomForm';
import './LoginPage.css';

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
    <div className="login__body">
      <h1>petPal</h1>
      <h3>An all-in-one pet planner</h3>
      <Widget>
        <form onSubmit={handleSubmit}>
          <div className="login__form">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}
            <div className="login__buttons">
              <button>Log In</button>
              <Link to="/register">Create an account</Link>
            </div>
          </div>
        </form>
    </Widget>
    </div>
  );
};

export default LoginPage;
