import React, { useContext, useState } from 'react';
import './AddEventForm.css';
import { Container, Row, Col } from 'react-bootstrap';

import useAxiosGet from '../../hooks/useAxiosGet';

import { postEvent } from '../../api';
import AuthContext from '../../context/AuthContext';
import { Pet } from '../../api/pets/types';
import type { EventCategory, EventForm } from '../../api/events/types';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Props {
  petId: number;
  setAddToggled: React.Dispatch<React.SetStateAction<boolean>>;
  setNeedsRefresh: React.Dispatch<React.SetStateAction<boolean>>;

}

const AddEventForm: React.FC<Props> = ({ petId, setAddToggled, setNeedsRefresh }) => {
  const [eCategoryId, setECategoryId] = useState<number>();
  const [date, setDate] = useState(getInitialDate());
  const [time, setTime] = useState(getInitialTime());
  const [description, setDescription] = useState<string>();
  const [pId, setPId] = useState(petId);

  const { user } = useContext(AuthContext);
  const { data: petOptions } = useAxiosGet<Pet[]>(`http://${baseUrl}/api/pets/`);
  const { data: eCategoryOptions } = useAxiosGet<EventCategory[]>(
    `http://${baseUrl}/api/events/categories/`
  );

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
    if (!date || !eCategoryId || !pId) { return; }
    const newEvent: EventForm = {
      date: date,
      time: time ?? null,
      description: description ?? null,
      event_category_id: eCategoryId,
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
              petOptions?.filter((p) => p.id == petId).map((p) => p.name)
            ) : (
              <select onChange={(e) => setPId(parseInt(e.target.value))}>
                <option value={undefined}>Pet</option>
                {petOptions?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
            <select onChange={(e) => setECategoryId(parseInt(e.target.value))}>
              <option value={undefined}>Category</option>
              {eCategoryOptions?.map((ec) => (
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
