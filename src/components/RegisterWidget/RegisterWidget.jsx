import React, { useContext } from "react";
import "./RegisterWidget.css";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

import Widget from "../Widget/Widget";
import { Link } from "react-router-dom";

const RegisterWidget = (props) => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <Widget title="New Account">
      <form onSubmit={handleSubmit}>
        <div className="register__form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <p style={{ fontSize: "12px" }}>
            NOTE: Make this an uncommon password with characters, numbers, and
            special characters!
          </p>
          <div className="register__buttons">
            <button>Register!</button>
            <Link to="login">Back to login</Link>
          </div>
        </div>
      </form>
    </Widget>
  );
};

export default RegisterWidget;
