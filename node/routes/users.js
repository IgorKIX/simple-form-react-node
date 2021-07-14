import express from 'express';

export default function (database) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        let users = [];
        try{
            users = await database.getAllUsersFromDB();
            res.statusCode = 200;
            res.json(users);
        } catch (err) {
            res.statusCode = 400;
            res.json({message: err});
        }
    })

    router.post('/', async (req, res) => {
        const {firstName, lastName, email} = req.body;

        if (!firstName || !lastName || !email) {
            res.sendStatus(400);
            return;
        }

        try {
            const savedUser = await database.createUser(firstName, lastName, email);
            res.statusCode = 200;
            res.json(savedUser);
        } catch (err) {
            res.statusCode = 400;
            res.json({message: err});
        }
    });

    return router;
}
