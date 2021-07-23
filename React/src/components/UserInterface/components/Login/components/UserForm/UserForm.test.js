import React from 'react';
import UserForm from './UserForm';
import {render, cleanup, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const axios = require('axios');
jest.mock('axios');

afterEach(cleanup);

const FIRST_NAME_INPUT_TEXT = 'First Name:';
const LAST_NAME_INPUT_TEXT = 'Last Name:';
const EMAIL_INPUT_TEXT = 'Email:';


it('should render all labels', async () => {
    render(<UserForm />);

    const name = screen.queryAllByText(FIRST_NAME_INPUT_TEXT);
    const lastName = screen.queryAllByText(LAST_NAME_INPUT_TEXT);
    const email = screen.queryAllByText(EMAIL_INPUT_TEXT);
    const btn = screen.getAllByRole('button', { name: /submit/i });

    await waitFor(() => {
        expect(name).toHaveLength(1);
        expect(lastName).toHaveLength(1);
        expect(email).toHaveLength(1);
        expect(btn).toHaveLength(1);
    });
});

it('should let the user add the new user', async () => {
    const users = [];
    const setUsers = jest.fn();
    const setCurrentUser = jest.fn();

    axios.post.mockResolvedValue({});

    render(<UserForm users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />);

    userEvent.type(screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, 'i')), 'testName');
    userEvent.type(screen.getByLabelText(new RegExp(LAST_NAME_INPUT_TEXT, 'i')), 'testLastName');
    userEvent.type(screen.getByLabelText(new RegExp(EMAIL_INPUT_TEXT, 'i')), 'testEmail@email.com');

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
        expect(screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, 'i'))).toHaveValue('testName')

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:4200/users", {
            firstName: 'testName',
            lastName: 'testLastName',
            email: 'testEmail@email.com',
        });
    });
});

describe('Inputs fields', () => {

    it('should print 3 errors when all inputs are empty & clicked on submit', async () => {
        render(<UserForm />);

        userEvent.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            const errors = screen.getAllByText('Required');
            expect(errors).toHaveLength(3);
        })
    });

    describe('First name input', () => {
        it('should not show errors after inputting a proper name', async () => {
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, 'i')), 'testName');

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(0);
            });
        });

        it('should show "Required" when input field left empty after clicking on it', async () => {
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, 'i')), '');
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(1);
            });
        });

        it('should show error when name is longer than 15 chars', async () => {
            const error = 'Must be 15 characters or less';
            const toLongName = 'a'.repeat(16);
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, 'i')), toLongName);
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText(error);
                expect(errors).toHaveLength(1);
            });
        });
    });

    describe('Last name input', () => {
        it('should not show errors after inputting a proper lastname', async () => {
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(LAST_NAME_INPUT_TEXT, 'i')), 'testName');

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(0);
            });
        });

        it('should show "Required" when input field left empty after clicking on it', async () => {
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(LAST_NAME_INPUT_TEXT, 'i')), '');
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(1);
            });
        });

        it('should show error when name is longer than 20 chars', async () => {
            const error = 'Must be 20 characters or less';
            const toLongName = 'a'.repeat(21);
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(LAST_NAME_INPUT_TEXT, 'i')), toLongName);
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText(error);
                expect(errors).toHaveLength(1);
            });
        });
    });

    describe('Email input', () => {
        it('should not show errors after inputting a proper lastname', async () => {
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(EMAIL_INPUT_TEXT, 'i')), 'email@email.com');

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(0);
            });
        });

        it('should show "Required" when input field left empty after clicking on it', async () => {
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(EMAIL_INPUT_TEXT, 'i')), '');
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(1);
            });
        });

        it('should show error when name is longer than 15 chars', async () => {
            const error = 'Invalid email address';
            render(<UserForm />);

            userEvent.type(screen.getByLabelText(new RegExp(EMAIL_INPUT_TEXT, 'i')), 'email');
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText(error);
                expect(errors).toHaveLength(1);
            });
        });
    });
});
