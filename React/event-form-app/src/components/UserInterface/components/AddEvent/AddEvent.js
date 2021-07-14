import {useFormik} from "formik";
import eventsService from "../../../../services/events";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React, {useState} from "react";

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length > 30) {
        errors.name = 'Must be 30 characters or less';
    }

    if (!values.date) {
        // Because of the problem with onBlur on DatePicker, error will be shown when date is set to ''
        if (values.date === '') {
            errors.name = "Required";
        }
    }

    return errors;
};

const AddEvent = ({currentUser, events, setEvents}) => {

    // Used only to trigger a rerender of the component when user choose a date
    const [date, setDate] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            date: null,
        },
        validate,
        onSubmit: values => {
            // Checking if date is set
            if (!values.date) {
                // Setting date as '' to trigger the validation error
                formik.values.date = '';
                formik.validateForm().then(() => {
                    setDate('');
                });
                return;
            }
            const eventObj = {
                name: values.name,
                date: Date.parse(values.date.toString()),
                userId: currentUser._id,
            }
            values.name = '';
            values.date = '';

            eventsService.create(eventObj).then(createdEvent => {
                console.log('Created event: ', createdEvent)
                setEvents([...events, createdEvent]);
            }).catch(err => console.error(err));
        }
    });

    return (
        <div className='form-container'>
            <h1>Add an event:</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Event name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className='error'>{formik.errors.name}</div>
                ) : null}
                <label htmlFor="date">Event date:</label>
                <DatePicker
                    id="date"
                    name="date"
                    type="date"
                    onBlur={formik.handleBlur}
                    value={formik.values.date ? formik.values.date.toLocaleDateString() : ''}
                    onChange={val => {
                        // Had couple problems with this lib, so I've hack a little to make it work properly
                        formik.values.date = val;
                        formik.validateForm().then(() => {
                            setDate(val);
                        })
                    }}
                />
                {formik.touched.date && formik.errors.date ? (
                    <div className='error'>{formik.errors.date}</div>
                ) : null}
                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddEvent;
