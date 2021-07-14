import React, {useState} from "react";
import Login from "./components/Login/Login";
import AddEvent from "./components/AddEvent/AddEvent";

const UserInterface = ({users, setUsers, events, setEvents}) => {

    const [currentUser, setCurrentUser] = useState();
    return (
        <>
            {currentUser ?
                <AddEvent currentUser={currentUser} events={events} setEvents={setEvents}/> :
                <Login users={users} setUsers={setUsers} setCurrentUser={setCurrentUser}/>
            }
        </>
    );
};

export default UserInterface;
