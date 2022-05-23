import React from "react";
import { Outlet } from "react-router-dom";

const PetsPage = (props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PetsPage;
