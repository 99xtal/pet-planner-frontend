import React from 'react';
import LoginWidget from '../../components/LoginWidget/LoginWidget';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login__body">
      <h1>petPal</h1>
      <h3>An all-in-one pet planner</h3>
      <LoginWidget />
    </div>
  );
};

export default LoginPage;
