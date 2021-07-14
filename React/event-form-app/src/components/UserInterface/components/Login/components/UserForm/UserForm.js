import {useFormik} from "formik";
import userService from "../../../../../../services/user";
import React from "react";
import "./UserForm.css";

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const UserForm = ({users, setUsers, setCurrentUser}) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validate,
        onSubmit: values => {
            const userObj = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
            }
            values.firstName = '';
            values.lastName = '';
            values.email = '';

            userService.create(userObj).then(createdUser => {
                console.log('Created user: ', createdUser);
                setUsers([...users, createdUser]);
                setCurrentUser(createdUser);
            });
        }
    });

    return (
        <div className="form-container">
            <h1>Add a new user or pick one from the list</h1>
            <form data-testid="userForm" onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div className='error'>{formik.errors.firstName}</div>
                ) : null}
                <label htmlFor="lastName">Last Name:</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div className='error'>{formik.errors.lastName}</div>
                ) : null}
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className='error'>{formik.errors.email}</div>
                ) : null}
                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default UserForm;
