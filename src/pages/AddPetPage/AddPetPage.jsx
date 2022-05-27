import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddPetModal from "../../components/AddPetModal/AddPetModal";

const AddPetPage = (props) => {
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <AddPetModal />
        </Col>
      </Row>
    </>
  );
};

export default AddPetPage;
