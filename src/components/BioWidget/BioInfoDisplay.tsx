import React from 'react';
import { Row, Col } from 'react-bootstrap';

import type { Pet } from '../../api/services/pets/types';

const BioInfoDisplay: React.FC<{ pet: Pet }> = ({ pet }) => {
  return (
    <Row>
      <Col>
        <Row>
          <Col>Breed:</Col>
          <Col>{pet.breed.name}</Col>
        </Row>
        <Row>
          <Col>Species:</Col>
          <Col>{pet.breed.species.binomial_name}</Col>
        </Row>
        <Row>
          <Col>Weight:</Col>
          <Col>{pet.weight} oz.</Col>
        </Row>
        <Row>
          <Col>Gender:</Col>
          <Col>{pet.gender}</Col>
        </Row>
        <Row>
          <Col>Birthday:</Col>
          <Col>{pet.birthday}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BioInfoDisplay;
