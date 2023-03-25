import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import useAxiosGet from '../../hooks/useAxiosGet';

import { patchEvent } from '../../api';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const EventEditForm = ({ event, setEditMode, setNeedsRefresh }) => {
  const [eCategoryId, setECategoryId] = useState(event.event_category.id);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [description, setDescription] = useState(event.description);

  const [eCategoryOptions] = useAxiosGet(
    `http://${baseUrl}/api/events/categories/`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      date: date,
      time: time,
      description: description,
      event_category_id: eCategoryId,
    };
    patchEvent(event.id, updatedEvent)
      .then(() => {
        setNeedsRefresh(true);
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

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
