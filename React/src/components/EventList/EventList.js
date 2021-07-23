import React from "react";
import Event from "./components/Event/Event";
import './EventList.css';

const EventList = ({users, events}) => {
    return (
        <div className='event-list-container'>
            {
                events.map(event => {
                    const organizer = users.find(user => user._id === event.organizer);
                    const eventDate = new Date(event.date).toLocaleString();
                    return <Event key={event._id} organizer={organizer} event={event} eventDate={eventDate} />;
                })
            }
        </div>
    );
};

export default EventList;
