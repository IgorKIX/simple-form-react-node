import "./App.css";
import UserInterface from "./components/UserInterface";
import EventList from "./components/EventList";
import React, { useContext } from "react";
import { UsersContext } from "./context/Users";
import { EventsContext } from "./context/Events";

function App() {
  const usersList = useContext(UsersContext)[0];
  const eventsList = useContext(EventsContext)[0];

  return (
    <>
      {eventsList && usersList ? (
        <main className='main-container'>
          <div className='interface-box'>
            <UserInterface />
          </div>
          <div className='list-box'>
            <EventList />
          </div>
        </main>
      ) : (
        <div className='loading-container'>Loading...</div>
      )}
    </>
  );
}

export default App;
