import React, { useContext } from "react";
import "./UsersList.css";
import { UsersContext } from "../../../../../../context/Users";
import { CurrentUserContext } from "../../../../../../context/CurrentUser";

const UsersList = () => {
  const users = useContext(UsersContext)[0];
  const setCurrentUser = useContext(CurrentUserContext)[1];

  const setUserAsCurrent = (user) => {
    setCurrentUser(user);
  };

  const renderUsers = () => {
    return users.map((user) => {
      const { _id, firstName, lastName, email } = user;
      const userInfo = [firstName, lastName, email].join(" ");
      return (
        <button
          key={_id}
          className='user-btn'
          onClick={() => setUserAsCurrent(user)}
        >
          {userInfo}
        </button>
      );
    });
  };

  return (
    <div className='user-list-container'>
      <h2 id='title'>Users:</h2>
      <div className='users-list'>{renderUsers()}</div>
    </div>
  );
};

export default UsersList;
