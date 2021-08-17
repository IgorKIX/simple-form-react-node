import React, { useEffect, useState } from "react";
import userService from "./../../services/user";

export const UsersContext = React.createContext();

export const UsersProvider = (props) => {
  const [users, setUsers] = useState(null);

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
  }, []);

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
