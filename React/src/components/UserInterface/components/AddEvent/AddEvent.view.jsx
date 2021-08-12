import PropTypes from "prop-types";
import DatePickerField from "../../../../shared/DatePickerField";
import { ErrorMessage, Field, Formik, Form } from "formik";

const AddEventView = ({ onSubmit, initialValues, validation }) => {
  return (
    <div className='form-container'>
      <h1>Add an event:</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => {
          onSubmit(values);
        }}
      >
        <Form>
          <label htmlFor='eventName'>Event name:</label>
          <Field id='eventName' name='eventName' type='text'></Field>
          <ErrorMessage name='eventName'>
            {(msg) => <div className='error'>{msg}</div>}
          </ErrorMessage>
          <label htmlFor='eventDate'>Event date:</label>
          <DatePickerField name='eventDate' />
          <ErrorMessage name='eventDate'>
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

AddEventView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,
};

export default AddEventView;
