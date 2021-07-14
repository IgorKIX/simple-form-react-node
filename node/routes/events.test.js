import app from "../app";
import {jest} from '@jest/globals'
import request from'supertest';

const database = {
    connectDB: jest.fn(),
    getAllEventsFromDB: jest.fn(),
    createEvent: jest.fn(),
    getUser: jest.fn()
}

describe('GET /events', () => {
    describe('given proper result from db', () => {
        it('should respond with a 200 status code',  async () => {
            const response = await request(app(database))
                .get('/events')
                .expect(200);
        });

        it('should respond with json in the content type header',  async () => {
            database.getAllEventsFromDB.mockReturnValue({});

            const response = await request(app(database))
                .get('/events')
                .expect('Content-Type', /json/)
        });
    });

    describe('given error in db', () =>{
        it('should return 400 status', async () => {
            database.getAllEventsFromDB.mockImplementation(() => {
                throw new Error('error');
            });

            const response = await request(app(database))
                .get('/events')
                .expect(400)
        });
    })
});

describe('POST /events', () => {
    describe('given name, date & useId', () => {

        const body = {
            name: 'name',
            date: '01.02.22',
            userId: 'userId'
        }
        const event = {event: "event"}

        beforeAll(() => {
            database.createEvent.mockReturnValue(event);
            database.getUser.mockReturnValue({user: "user"})
        })

        it('should respond with new event obj', async () => {
            const response = await request(app(database)).post('/events').send(body)

            expect(response.body).toMatchObject(event);
        });

        it('should respond with a code of 200', async () => {
            const response = await request(app(database)).post('/events').send(body)

            expect(response.statusCode).toBe(200);
        });
    });

    describe('when the name, date & userId is missing', () => {
        it('should respond with a code of 400',  async () =>  {
            const bodyData = [
                {name: 'name'},
                {date: '01.02.22'},
                {userId: 'userId'},
                {name: 'name', date: '01.02.22'},
                {name: 'name', userId: 'userId'},
                {date: '01.02.22', userId: 'userId'},
                {}
            ];

            for (const body of bodyData) {
                const response = await request(app(database)).post('/events').send(body)
                expect(response.statusCode).toBe(400);
            }
        });
    });

    describe('when the date is given in wrong format', () => {
        it('should respond with a code of 400', async () => {
            const body = {
                name: 'name',
                date: 'date',
                userId: 'userId'
            }

            const response = await request(app(database)).post('/events').send(body);

            expect(response.statusCode).toBe(400);
        });
    })
})
