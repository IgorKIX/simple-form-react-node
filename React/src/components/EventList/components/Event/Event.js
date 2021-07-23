import './Event.css';

const Event = ({organizer, event, eventDate}) => {
    return (
        <div className='event-box'>
            <h2>{event.name}</h2>
            <p className='event-description'><strong>{eventDate}</strong> <span className='organizer'>{organizer.firstName} {organizer.lastName}</span></p>
        </div>
    );
}

export default Event;
