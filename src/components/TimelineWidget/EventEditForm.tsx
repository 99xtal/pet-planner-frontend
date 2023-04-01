import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { getEventCategories, patchEvent } from '../../api';
import type { Event, EventCategory } from '../../api/events/types';

interface Props {
  event: Event;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setNeedsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventEditForm: React.FC<Props> = ({ event, setEditMode, setNeedsRefresh }) => {
  const [eCategoryId, setECategoryId] = useState(event.event_category.id);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time ?? '');
  const [description, setDescription] = useState(event.description ?? '');
  const [eCategoryOptions, setECategoryOptions] = useState<EventCategory[]>();

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

  if (!eCategoryOptions) {
    return null;
  }

  return (
    <div>
      <form id={event.id.toString()}>
        <Row>
          <Col>
            <select onChange={(e) => setECategoryId(parseInt(e.target.value))}>
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
