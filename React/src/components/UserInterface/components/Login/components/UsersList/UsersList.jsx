import PropTypes from "prop-types";
import "./UsersList.css";

const UsersList = ({ users, setCurrentUser }) => {
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

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default UsersList;
