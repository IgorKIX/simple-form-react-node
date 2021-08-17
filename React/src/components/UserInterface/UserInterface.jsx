import React, { useContext } from "react";
import Login from "./components/Login";
import AddEvent from "./components/AddEvent";
import { CurrentUserContext } from "../../context/CurrentUser";

const UserInterface = () => {
  const currentUser = useContext(CurrentUserContext)[0];
  return <>{currentUser ? <AddEvent /> : <Login />}</>;
};

export default UserInterface;
