import "./App.css";
import UserInterface from "./components/UserInterface";
import EventList from "./components/EventList";
import userService from "./services/user";
import eventService from "./services/events";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState(null);
  const [eventsList, setEventsList] = useState(null);

  useEffect(() => {
    userService
      .getAll()
      .then((initialUsersList) => {
        // Log to see what cames from backend
        console.log("Initial user list from backend: ", initialUsersList);
        if (Array.isArray(initialUsersList)) {
          setUsers(initialUsersList);
          return;
        }
        setUsers([]);
        console.error(
          "Error during getting the data about users from the server"
        );
      })
      .catch((err) => {
        setUsers([]);
        console.error(err);
      });

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
    <>
      {eventsList && users ? (
        <main className='main-container'>
          <div className='interface-box'>
            <UserInterface
              users={users}
              setUsers={setUsers}
              events={eventsList}
              setEvents={setEventsList}
            />
          </div>
          <div className='list-box'>
            <EventList users={users} events={eventsList} />
          </div>
        </main>
      ) : (
        <div className='loading-container'>Loading...</div>
      )}
    </>
  );
}

export default App;
