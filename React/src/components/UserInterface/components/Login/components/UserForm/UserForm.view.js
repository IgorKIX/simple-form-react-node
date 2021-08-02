import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import "./UserForm.css";

const UserFormView = ({ onSubmit, initValues, validationSchema }) => {
  return (
    <div className='form-container'>
      <h1>Add a new user or pick one from the list</h1>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
        }}
        enableReinitialize
      >
        <Form data-testid='userForm'>
          <label htmlFor='firstName'>First Name:</label>
          <Field id='firstName' name='firstName' type='text'></Field>
          <ErrorMessage name='firstName'>
            {(msg) => <div className='error'>{msg}</div>}
          </ErrorMessage>

          <label htmlFor='lastName'>Last Name:</label>
          <Field id='lastName' name='lastName' type='text'></Field>
          <ErrorMessage name='lastName'>
            {(msg) => <div className='error'>{msg}</div>}
          </ErrorMessage>

          <label htmlFor='email'>Email:</label>
          <Field id='email' name='email' type='email'></Field>
          <ErrorMessage name='email'>
            {(msg) => <div className='error'>{msg}</div>}
          </ErrorMessage>

          <button className='submit-btn' type='submit'>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserFormView;
