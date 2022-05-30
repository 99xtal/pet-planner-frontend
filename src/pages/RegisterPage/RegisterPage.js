import React, { useContext } from "react";
import "./RegisterPage.css";

import RegisterWidget from "../../components/RegisterWidget/RegisterWidget";

const RegisterPage = () => {
  return (
    <div className="register__body">
      <RegisterWidget />
    </div>
  );
};

export default RegisterPage;
