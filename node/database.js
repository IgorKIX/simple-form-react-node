import mongoose from 'mongoose';
import User from "./models/User.js";
import Event from "./models/Event.js";

export function connectDB() {
    mongoose.connect(`mongodb://mongo_db:27017/event_app`, { useUnifiedTopology: true,  useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'));
    db.once('opne', () => console.log('Connected'));
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

