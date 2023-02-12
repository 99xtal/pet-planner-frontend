// General Imports
import React, { useEffect, useState, useContext } from "react";

// Component Imports
import { Container, Row, Col } from "react-bootstrap";

// Hook Imports
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Context Imports
import PetsContext from "../../context/PetsContext";

// Util Imports
import { getBreedsByCategory, getPetCategories } from "../../utils/api";

const AddPetForm = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [breedOptions, setBreedOptions] = useState([]);

  const [name, setName] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [breedId, setBreedId] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [weight, setWeight] = useState(null);

  const navigate = useNavigate();
  const { addPet } = useContext(PetsContext);
  const [user] = useAuth();

  useEffect(() => {
    getPetCategories()
      .then((res) => setCategoryOptions(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getBreedsByCategory(categoryId).then((res) => setBreedOptions(res.data));
  }, [categoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPet = {
      name: name,
      birthday: birthday,
      gender: gender,
      weight: weight,
      category_id: categoryId,
      breed_id: breedId,
      user_id: user.id,
    };
    addPet(newPet);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col className="d-flex justify-content-start">Name:</Col>
            <Col>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">Category:</Col>
            <Col>
              <select onChange={(e) => setCategoryId(e.target.value)}>
                <option value={null}>---</option>
                {categoryOptions.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.category}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          {categoryId !== null && (
            <Row>
              <Col className="d-flex justify-content-start">Breed:</Col>
              <Col>
                <select onChange={(e) => setBreedId(e.target.value)}>
                  <option value={null}>---</option>
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
          )}
          <Row>
            <Col className="d-flex justify-content-start">Gender:</Col>
            <Col>
              <select onChange={(e) => setGender(e.target.value)}>
                <option value={null}>---</option>
                {["Male", "Female", "Unknown"].map((g) => {
                  return (
                    <option key={g} value={g.slice(0, 1)}>
                      {g}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">Birthday:</Col>
            <Col>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">Weight:</Col>
            <Col>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <button type="submit">Create Pet</button>
              <button onClick={() => navigate("/dashboard")}>Cancel</button>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default AddPetForm;
