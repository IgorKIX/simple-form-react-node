import React from "react";
import "./Login.css";
import UserForm from "./components/UserForm/UserForm";
import UsersList from "./components/UsersList/UsersList";

const Login = ({users, setUsers, setCurrentUser}) => {

    return (
        <div className="login-container">
            <UserForm users={users} setUsers={setUsers} setCurrentUser={setCurrentUser}/>
            <UsersList users={users} setCurrentUser={setCurrentUser}/>
        </div>
    );
}

export default Login;
