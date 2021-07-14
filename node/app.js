import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import usersRoute from'./routes/users.js';
import eventsRoute from'./routes/events.js';

export default function (database) {
    const app = express();
    database.connectDB();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());

    // Routes
    app.use('/users', usersRoute(database));
    app.use('/events', eventsRoute(database));

    return app;
}
