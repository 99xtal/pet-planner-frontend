import React, { useEffect, useContext } from "react";
import "./LoginWidget.css";

import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

import { Link } from "react-router-dom";
import Widget from "../Widget/Widget";

const LoginWidget = (props) => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
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
  );
};

export default LoginWidget;
