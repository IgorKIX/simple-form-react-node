import mongoose from 'mongoose';
import User from "./models/User.js";
import Event from "./models/Event.js";

// Deleted login info for the safety reason
const LOGIN = '';
const PASSWORD = '';

export function connectDB() {
    mongoose.connect(`mongodb+srv://${LOGIN}:${PASSWORD}@cluster0.mtqmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        { useUnifiedTopology: true,  useNewUrlParser: true },
        () => console.log('Connected to DB!'));
}

// Users

export async function getAllUsersFromDB() {
    return User.find();
}

export async function getUser(userId) {
    return User.findOne({ _id: userId });
}

export async function createUser(firstName, lastName, email) {
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
    });

    return newUser.save();
}

// Events

export async function getAllEventsFromDB() {
    return Event.find();
}

export async function createEvent(name, dateObj, organizer) {
    const newEvent = new Event({
        name: name,
        date: dateObj,
        organizer: organizer._id
    });

    return newEvent.save();
}

