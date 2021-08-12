import React, { useState } from "react";
import PropTypes from "prop-types";
import Login from "./components/Login";
import AddEvent from "./components/AddEvent";

const UserInterface = ({ users, setUsers, events, setEvents }) => {
  const [currentUser, setCurrentUser] = useState();
  return (
    <>
      {currentUser ? (
        <AddEvent
          currentUser={currentUser}
          events={events}
          setEvents={setEvents}
        />
      ) : (
        <Login
          users={users}
          setUsers={setUsers}
          setCurrentUser={setCurrentUser}
        />
      )}
    </>
  );
};

UserInterface.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default UserInterface;
