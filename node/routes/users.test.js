import app from "../app";
import {jest} from '@jest/globals'
import request from'supertest';

const database = {
    connectDB: jest.fn(),
    getAllUsersFromDB: jest.fn(),
    createUser: jest.fn()
}

describe('GET /users', () => {
    describe('given proper result from db', () => {
        it('should respond with a 200 status code',  async () => {
            const response = await request(app(database))
                .get('/users')
                .expect(200);
        });

        it('should respond with json in the content type header',  async () => {
            database.getAllUsersFromDB.mockReturnValue({});

            const response = await request(app(database))
                .get('/users')
                .expect('Content-Type', /json/)
        });
    });

    describe('given error in db', () =>{
        it('should return 400 status', async () => {
            database.getAllUsersFromDB.mockImplementation(() => {
                throw new Error('error');
            });

            const response = await request(app(database))
                .get('/users')
                .expect(400)
        });
    })
});

describe('POST /users', () => {
    describe('given name, lastName & email', () => {

        const body = {
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email'
        }
        const user = {user: "user"}

        beforeAll(() => {
            database.createUser.mockReturnValue(user);
        })

        it('should respond with new user obj', async () => {
            const response = await request(app(database)).post('/users').send(body)

            expect(response.body).toMatchObject(user);
        });

        it('should respond with a code of 200', async () => {
            const response = await request(app(database)).post('/users').send(body)

            expect(response.statusCode).toBe(200);
        });
    });

    describe('when the name, lastName & email is missing', () => {
        it('should respond with a code of 400',  async () =>  {
            const bodyData = [
                {firstName: 'firstName'},
                {lastName: 'lastName'},
                {email: 'email'},
                {firstName: 'firstName', lastName: 'lastName'},
                {firstName: 'firstName', email: 'email'},
                {lastName: 'lastName', email: 'email'},
                {}
            ];

            for (const body of bodyData) {
                const response = await request(app(database)).post('/users').send(body)
                expect(response.statusCode).toBe(400);
            }
        });
    });
})
