import express from 'express';

export default function (database) {
    const router = express.Router();

    router.get('/', async(req, res) => {
        try{
            const events = await database.getAllEventsFromDB();
            res.json(events);
        } catch (err) {
            res.statusCode = 400;
            res.json({message: err});
        }
    })

    router.post('/', async (req, res) => {
        const {name, date, userId} = req.body;

        if (!name || !date || !userId) {
            res.sendStatus(400);
            return;
        }

        const dateObj = new Date(date);

        if (isNaN(dateObj)) {
            res.sendStatus(400);
            return;
        }

        const organizer = await database.getUser(userId);

        try {
            const savedEvent = await database.createEvent(name, dateObj, organizer);
            res.statusCode = 200;
            res.json(savedEvent);
        } catch (err) {
            res.statusCode = 400;
            res.json(`{message: ${err}`);
        }
    });

    return router;
}

