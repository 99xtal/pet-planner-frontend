import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import useAxiosGet from "../../hooks/useAxiosGet";
import useAuth from "../../hooks/useAuth";

const EventEditForm = ({ event, getEvents, setEditMode }) => {
  const [user, token] = useAuth();
  const [eCategoryId, setECategoryId] = useState(event.event_category.id);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [description, setDescription] = useState(event.description);

  const [eCategoryOptions, optionsLoading] = useAxiosGet(
    "http://127.0.0.1:8000/api/events/categories/"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent();
  };

  async function updateEvent() {
    const updatedEvent = {
      date: date,
      time: time,
      description: description,
      event_category_id: eCategoryId,
    };
    try {
      await axios.patch(
        "http://127.0.0.1:8000/api/events/" + event.id + "/",
        updatedEvent,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await getEvents();
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form id={event.id}>
        <Row>
          <Col>
            <select onChange={(e) => setECategoryId(e.target.value)}>
              {eCategoryOptions.map((ec) => (
                <option key={ec.id} value={ec.id}>
                  {ec.title}
                </option>
              ))}
            </select>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
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
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Row>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default EventEditForm;
