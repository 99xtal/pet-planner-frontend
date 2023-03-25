// General Imports
import React from 'react';
import { Row, Col } from 'react-bootstrap';

import type { User } from '../../utils/api/services/auth/types';

interface Props {
  profile: User;
}

const ProfileDisplay: React.FC<Props> = ({ profile }) => {
  return (
    <Row>
      <Col>
        <Row>
          <Col>First Name:</Col>
          <Col>{profile.first_name}</Col>
        </Row>
        <Row>
          <Col>Last Name:</Col>
          <Col>{profile.last_name}</Col>
        </Row>
        <Row>
          <Col>Username:</Col>
          <Col>{profile.username}</Col>
        </Row>
        <Row>
          <Col>Email:</Col>
          <Col>{profile.email}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileDisplay;
