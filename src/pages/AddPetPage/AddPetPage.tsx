import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AddPetModal from '../../components/AddPetModal/AddPetModal';

const AddPetPage = () => {
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
