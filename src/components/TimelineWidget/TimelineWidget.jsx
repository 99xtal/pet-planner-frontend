// General Imports
import React, { useEffect, useState } from "react";

// Component Imports
import Widget from "../Widget/Widget";
import WidgetEditMenu from "../Widget/WidgetEditMenu";

// Hook Imports
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import EventCard from "./EventCard";

const TimelineWidget = ({ petId }) => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);
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
      {events.map((e) => {
        return (
          <EventCard key={e.id} event={e} getEvents={getEvents} petId={petId} />
        );
      })}
    </Widget>
  );
};

export default TimelineWidget;
