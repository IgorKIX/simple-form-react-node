import React, { useEffect, useState } from "react";
import eventService from "./../../services/events";

export const EventsContext = React.createContext();

export const EventsProvider = (props) => {
  const [eventsList, setEventsList] = useState(null);

  useEffect(() => {
    eventService
      .getAll()
      .then((initialEventsList) => {
        // Log to see what cames from backend
        console.log("Initial events list from backend: ", initialEventsList);
        if (Array.isArray(initialEventsList)) {
          setEventsList(initialEventsList);
          return;
        }
        setEventsList([]);
        console.error(
          "Error during getting the data about events from the server"
        );
      })
      .catch((err) => {
        setEventsList([]);
        console.error(err);
      });
  }, []);

  return (
    <EventsContext.Provider value={[eventsList, setEventsList]}>
      {props.children}
    </EventsContext.Provider>
  );
};
