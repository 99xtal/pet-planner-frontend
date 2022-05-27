import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import useAxiosGet from "../../hooks/useAxiosGet";

const BioInfoEdit = ({ pet, setEditMode }) => {
  const [user, token] = useAuth();
  const [breedId, setBreedId] = useState(pet.breed.id);
  const [weight, setWeight] = useState(pet.weight);
  const [gender, setGender] = useState(pet.gender);
  const [birthday, setBirthday] = useState(pet.birthday);

  const [breedOptions, breedsAreLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/breeds/?categoryId=${pet.category.id}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    patchPet();
    setEditMode(false);
  };

  async function patchPet() {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/pets/${pet.id}/`,
        {
          breed_id: parseInt(breedId),
          weight: weight,
          gender: gender,
          birthday: birthday,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Row>
            <Col>Breed:</Col>
            <Col>
              <select onChange={(e) => setBreedId(e.target.value)}>
                {breedOptions.map((b) => {
                  return (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>Species:</Col>
            <Col>
              <p>{pet.breed.species.binomial_name} </p>
            </Col>
          </Row>

          <Row>
            <Col>Weight:</Col>
            <Col>
              <input
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
            </Col>
          </Row>
          <Row>
            <Col>Gender:</Col>
            <Col>
              <input
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              />
            </Col>
          </Row>
          <Row>
            <Col>Birthday:</Col>
            <Col>
              <input
                onChange={(e) => setBirthday(e.target.value)}
                type="date"
                value={birthday}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <button onClick={() => setEditMode(false)}>Cancel</button>
          <button type="submit">Save</button>
        </Col>
      </Row>
    </form>
  );
};

export default BioInfoEdit;
