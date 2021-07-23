import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersList from "./UsersList";

const usersList = [
    {
        _id: '1',
        firstName: 'testName1',
        lastName: 'testLastName',
        email: 'testEmail@email.com'
    },
    {
        _id: '2',
        firstName: 'testName2',
        lastName: 'testLastName',
        email: 'testEmail@email.com'
    },
    {
        _id: '3',
        firstName: 'testName3',
        lastName: 'testLastName',
        email: 'testEmail@email.com'
    }
];
const setCurrentUser = jest.fn();

it('should render the h1 of component',  async () => {
    render(<UsersList users={usersList} setCurrentUser={setCurrentUser} />);

    const h1 = screen.queryAllByText('Users:');

    await waitFor(() => {
        expect(h1).toHaveLength(1);
    })
});

it('should render the list of users elements',  async () => {
    render(<UsersList users={usersList} setCurrentUser={setCurrentUser} />);

    const btns = document.querySelectorAll('.user-btn');

    await waitFor(() => {
        expect(btns).toHaveLength(usersList.length);
    })
});

it('should call the method when clicked on the btn', async () => {
    const userInfo = [usersList[0].firstName, usersList[0].lastName, usersList[0].email].join(' ');

    render(<UsersList users={usersList} setCurrentUser={setCurrentUser} />);

    userEvent.click(screen.getByText(new RegExp(userInfo, 'i')).closest('button'));

    await waitFor(() => {
        expect(setCurrentUser).toHaveBeenCalledTimes(1);
        expect(setCurrentUser).toHaveBeenCalledWith(usersList[0]);
    })
})
