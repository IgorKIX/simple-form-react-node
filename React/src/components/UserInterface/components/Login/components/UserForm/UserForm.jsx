import React, { useContext } from "react";
import userService from "../../../../../../services/user";
import * as Yup from "yup";
import UserFormView from "./UserForm.view";
import { UsersContext } from "../../../../../../context/Users";
import { CurrentUserContext } from "../../../../../../context/CurrentUser";

const UserForm = () => {
  const [users, setUsers] = useContext(UsersContext);
  const setCurrentUser = useContext(CurrentUserContext)[1];

  const onSubmit = (values) => {
    const userObj = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    values.firstName = "";
    values.lastName = "";
    values.email = "";

    userService.create(userObj).then((createdUser) => {
      console.log("Created user: ", createdUser);
      setUsers([...users, createdUser]);
      setCurrentUser(createdUser);
    });
  };

  const initValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  return (
    <UserFormView
      onSubmit={onSubmit}
      initValues={initValues}
      validationSchema={validationSchema}
    />
  );
};

export default UserForm;
