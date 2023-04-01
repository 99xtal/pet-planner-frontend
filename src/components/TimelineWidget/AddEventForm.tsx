import React, { useContext, useEffect, useState } from 'react';
import './AddEventForm.css';
import { Container, Row, Col } from 'react-bootstrap';

import { getEventCategories, getPets, postEvent } from '../../api';
import AuthContext from '../../context/AuthContext';
import type { EventCategory, EventForm } from '../../api/events/types';
import { Pet } from '../../api/pets/types';

const AddEventForm = ({ petId, setAddToggled, setNeedsRefresh }) => {
  const { user } = useContext(AuthContext);
  const [eCategoryId, setECategoryId] = useState<string>();
  const [date, setDate] = useState(getInitialDate());
  const [time, setTime] = useState(getInitialTime());
  const [description, setDescription] = useState<string>();
  const [pId, setPId] = useState(petId);
  const [eCategoryOptions, setECategoryOptions] = useState<EventCategory[]>([]);
  const [petOptions, setPetOptions] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await getEventCategories();
        if (result.data) {
          setECategoryOptions(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOptions();
  }, []);


  useEffect(() => {
    const fetchPetOptions = async () => {
      try {
        const result = await getPets();
        if (result.data) {
          setPetOptions(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPetOptions();
  });

  function getInitialTime() {
    const d = new Date();
    return d.toTimeString().slice(0, 8);
  }

  function getInitialDate() {
    const d = new Date();
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    let month: string | number = d.getMonth() + 1;
    month = month.toString().padStart(2, '0');
    return [year, month, day].join('-');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!eCategoryId) {
      return;
    }

    const newEvent: EventForm = {
      date: date,
      time: time,
      description: description ?? null,
      event_category_id: parseInt(eCategoryId),
      pet_id: pId,
      user_id: user!.id,
    };
    postEvent(newEvent)
      .then(() => {
        setAddToggled(false);
        setNeedsRefresh(true);
      })
      .catch((err) => console.log(err));
  }

  if (!eCategoryOptions && !petOptions) {
    return null;
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
                <option value={undefined}>Pet</option>
                {petOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
            <select onChange={(e) => setECategoryId(e.target.value)}>
              <option value={undefined}>Category</option>
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
