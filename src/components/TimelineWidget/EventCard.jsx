import React, { useState } from 'react';
import './EventCard.css';
import { Row, Col } from 'react-bootstrap';
import EventMenu from './EventMenu';
import EventEditForm from './EventEditForm';

const EventCard = ({ event, setNeedsRefresh }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="eventcard">
      {editMode ? (
        <EventEditForm
          event={event}
          setNeedsRefresh={setNeedsRefresh}
          setEditMode={setEditMode}
        />
      ) : (
        <div>
          <Row>
            <Col>
              <p>{`${event.pet.name}- ${event.event_category.title}`}</p>
            </Col>
            <Col className="d-flex justify-content-end">
              <EventMenu
                eventId={event.id}
                setEditMode={setEditMode}
                setNeedsRefresh={setNeedsRefresh}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {event.date} {event.time}
            </Col>
          </Row>
          <Row>
            <Col>{event.description}</Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default EventCard;
