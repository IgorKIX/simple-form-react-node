import React, { useContext } from "react";
import Event from "./components/Event";
import "./EventList.css";
import { UsersContext } from "../../context/Users";
import { EventsContext } from "../../context/Events";

const EventList = () => {
  const usersList = useContext(UsersContext)[0];
  const eventsList = useContext(EventsContext)[0];

  return (
    <div className='event-list-container'>
      {eventsList.map((event) => {
        const organizer = usersList.find(
          (user) => user._id === event.organizer
        );
        const eventDate = new Date(event.date).toLocaleString();
        return (
          <Event
            key={event._id}
            organizer={organizer}
            event={event}
            eventDate={eventDate}
          />
        );
      })}
    </div>
  );
};

export default EventList;
