import * as Yup from "yup";
import PropTypes from "prop-types";
import eventsService from "../../../../services/events";
import React from "react";
import AddEventView from "./AddEvent.view";

const AddEvent = ({ currentUser, events, setEvents }) => {
  const onSubmit = (values) => {
    const eventObj = {
      name: values.eventName,
      date: Date.parse(values.eventDate.toString()),
      userId: currentUser._id,
    };
    values.eventName = "";
    values.eventDate = "";

    eventsService
      .create(eventObj)
      .then((createdEvent) => {
        console.log("Created event: ", createdEvent);
        setEvents([...events, createdEvent]);
      })
      .catch((err) => console.error(err));
  };

  const initialValues = {
    eventName: "",
    eventDate: null,
  };

  const validation = Yup.object({
    eventName: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    eventDate: Yup.string().required("Required").nullable(),
  });

  return (
    <AddEventView
      onSubmit={onSubmit}
      initialValues={initialValues}
      validation={validation}
    />
  );
};

AddEvent.propTypes = {
  currentUser: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default AddEvent;
