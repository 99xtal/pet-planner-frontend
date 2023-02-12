import React from "react";

import ProfileWidget from "../../components/ProfileWidget/ProfileWidget";
import { Row, Col } from "react-bootstrap";
import { BsGearWideConnected } from "react-icons/bs";

const SettingsPage = () => {
  return (
    <>
      <div className="petpage">
        <Row>
          <Col className="d-flex justify-content-start align-items-center">
            <BsGearWideConnected size={96} color="white" />
            <h1 className="petpage__name">Settings</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ProfileWidget />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SettingsPage;
