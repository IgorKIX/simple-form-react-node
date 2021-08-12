import PropTypes from "prop-types";
import "./Event.css";

const Event = ({ organizer, event, eventDate }) => {
  return (
    <div className='event-box'>
      <h2>{event.name}</h2>
      <p className='event-description'>
        <strong>{eventDate}</strong>{" "}
        <span className='organizer'>
          {organizer.firstName} {organizer.lastName}
        </span>
      </p>
    </div>
  );
};

Event.propTypes = {
  organizer: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  eventDate: PropTypes.string.isRequired,
};

export default Event;
