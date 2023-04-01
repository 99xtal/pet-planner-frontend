// General Imports
import React, { useState } from 'react';

// Component Imports
import { Row, Col } from 'react-bootstrap';

// Util Imports
import { patchProfile } from '../../api';

import type { User } from '../../api/auth/types';

interface Props {
  profile: User;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileEdit: React.FC<Props> = ({ profile, setEditMode, setNeedsUpdate }) => {
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);

  function handleSubmit(e) {
    e.preventDefault();
    const updatedProfile = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
    };
    patchProfile(updatedProfile).then(() => {
      setNeedsUpdate(true);
      setEditMode(false);
    });
  }

  return (
    <Row>
      <Col>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>First Name:</Col>
            <Col>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>Last Name:</Col>
            <Col>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>Username:</Col>
            <Col>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>Email:</Col>
            <Col>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <button type="submit">Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  );
};

export default ProfileEdit;
