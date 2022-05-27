import React, { useState } from "react";
import "./AddEventForm.css";
import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosGet from "../../hooks/useAxiosGet";

const AddEventForm = ({ petId, getEvents, setAddToggled }) => {
  const [eCategoryId, setECategoryId] = useState(null);
  const [date, setDate] = useState(getInitialDate());
  const [time, setTime] = useState(getInitialTime());
  const [description, setDescription] = useState(null);
  const [pId, setPId] = useState(petId);

  const [user, token] = useAuth();
  const [petOptions, petOptionsLoading] = useAxiosGet(
    "http://127.0.0.1:8000/api/pets/"
  );
  const [eCategoryOptions, optionsLoading] = useAxiosGet(
    "http://127.0.0.1:8000/api/events/categories/"
  );

  function getInitialTime() {
    const d = new Date();
    return d.toTimeString().slice(0, 8);
  }

  function getInitialDate() {
    const d = new Date();
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    return [year, month, day].join("-");
  }

  function handleSubmit(e) {
    e.preventDefault();
    postEvent();
    setAddToggled(false);
  }

  async function postEvent() {
    const newEvent = {
      date: date,
      time: time,
      description: description,
      event_category_id: eCategoryId,
      pet_id: pId,
      user_id: user.id,
    };
    try {
      await axios.post("http://127.0.0.1:8000/api/events/", newEvent, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await getEvents();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-start">
          <p>New Event</p>
        </Col>
      </Row>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col className="d-flex justify-content-start">
            {petId ? (
              petOptions.filter((p) => p.id == petId).map((p) => p.name)
            ) : (
              <select onChange={(e) => setPId(e.target.value)}>
                <option value={null}>Pet</option>
                {petOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
            <select onChange={(e) => setECategoryId(e.target.value)}>
              <option value={null}>Category</option>
              {eCategoryOptions.map((ec) => (
                <option key={ec.id} value={ec.id}>
                  {ec.title}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-start">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <textarea
              placeholder="Description"
              className="dbox"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <button onClick={() => setAddToggled(false)}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </Container>
  );
};

export default AddEventForm;
