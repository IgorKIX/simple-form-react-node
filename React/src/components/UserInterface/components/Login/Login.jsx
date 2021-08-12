import React from "react";
import "./Login.css";
import PropTypes from "prop-types";
import UserForm from "./components/UserForm";
import UsersList from "./components/UsersList";

const Login = ({ users, setUsers, setCurrentUser }) => {
  return (
    <div className='login-container'>
      <UserForm
        users={users}
        setUsers={setUsers}
        setCurrentUser={setCurrentUser}
      />
      <UsersList users={users} setCurrentUser={setCurrentUser} />
    </div>
  );
};

Login.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired
}

export default Login;
