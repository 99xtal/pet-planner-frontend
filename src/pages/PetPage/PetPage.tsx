import React, { useEffect, useState, useContext } from 'react';
import './PetPage.css';

// Hook Imports
import { useParams } from 'react-router-dom';

// Component Imports
import BioWidget from '../../components/BioWidget/BioWidget';
import DietWidget from '../../components/DietWidget/DietWidget';
import HealthWidget from '../../components/HealthWidget/HealthWidget';
import TimelineWidget from '../../components/TimelineWidget/TimelineWidget';
import PetPageEditMenu from '../../components/PetPageEditMenu/PetPageEditMenu';
import { Row, Col } from 'react-bootstrap';
import { FaDog, FaCat } from 'react-icons/fa';
import { GiSandSnake, GiGecko } from 'react-icons/gi';

// Context Imports
import PetsContext from '../../context/PetsContext';

// Util Imports
import { getPetById } from '../../utils/api';

import type { Pet } from '../../utils/api/services/pets/types';

const PetPage = () => {
  const [pet, setPet] = useState<Pet>();
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const { petId } = useParams();
  const { updatePet } = useContext(PetsContext);

  useEffect(() => {
    if (petId) {
      getPetById(parseInt(petId))
      .then((res) => {
        setPet(res.data);
        setName(res.data.name);
      })
      .catch((err) => console.log(err));

    }
    return () => setNeedsUpdate(false);
  }, [petId, needsUpdate]);

  const getIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'dog':
        return <FaDog size={96} color="white" />;
      case 'cat':
        return <FaCat size={96} color="white" />;
      case 'snake':
        return <GiSandSnake size={96} color="white" />;
      case 'gecko':
      case 'lizard':
        return <GiGecko size={96} color="white" />;
      default:
        return null;
    }
  };

  async function handleRename(e) {
    e.preventDefault();
    if (!petId) {
      return;
    }
    await updatePet(parseInt(petId), {
      name: name,
    });
    setEditMode(false);
    setNeedsUpdate(true);
  }

  return (
    <>
      {pet && (
        <div className="petpage">
          <Row>
            <Col className="d-flex justify-content-start">
              <div className="d-flex">
                {getIcon(pet.category.category)}
                {editMode ? (
                  <form onSubmit={handleRename}>
                    <input
                      className="petpage__name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input type="submit" style={{ display: 'none' }} />
                  </form>
                ) : (
                  <h1 className="petpage__name">{pet.name}</h1>
                )}
              </div>
            </Col>
            <Col
              sm={1}
              className="d-flex justify-content-end align-items-center"
            >
              <PetPageEditMenu petId={petId} setEditMode={setEditMode} />
            </Col>
          </Row>

          <Row>
            <Col>
              <BioWidget petId={pet.id} />
              <DietWidget petId={pet.id} />
              <HealthWidget petId={pet.id} />
            </Col>
            <Col className="d-flex align-items-start">
              <TimelineWidget petId={pet.id} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default PetPage;
