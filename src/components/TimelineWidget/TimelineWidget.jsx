// General Imports
import React, { useEffect, useState } from "react";
import "./TimelineWidget.css";

// Component Imports
import Widget from "../Widget/Widget";
import AddEventForm from "./AddEventForm";
import { BsPlus } from "react-icons/bs";

// Hook Imports
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import EventCard from "./EventCard";

const TimelineWidget = ({ petId }) => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);
  const [addToggled, setAddToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => getEvents(), []);

  async function getEvents() {
    let BASE_URL = "http://127.0.0.1:8000/api/events/";
    if (petId) {
      BASE_URL = BASE_URL + `?petId=${petId}`;
    }

    setIsLoading(true);
    try {
      let response = await axios.get(BASE_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <Widget title="Timeline">
      <div className="eventwindow">
        {events.length > 0 ? (
          events.map((e) => {
            return (
              <EventCard
                key={e.id}
                event={e}
                getEvents={getEvents}
                petId={petId}
              />
            );
          })
        ) : (
          <p>No events to display</p>
        )}
      </div>
      {addToggled ? (
        <AddEventForm
          petId={petId}
          getEvents={getEvents}
          setAddToggled={setAddToggled}
        />
      ) : (
        <div className="posteventbutton">
          <a href="#0" onClick={() => setAddToggled(true)}>
            <div className="addbutton">
              <BsPlus size={40} color={"white"} />
            </div>
          </a>
        </div>
      )}
    </Widget>
  );
};

export default TimelineWidget;
