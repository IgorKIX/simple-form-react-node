import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddEvent from "./AddEvent";

// currentUser={currentUser} events={events} setEvents={setEvents}

it('should render the h1',  async () => {
    render(<AddEvent />);

    const h1 = screen.queryAllByText('Add an event:');

    await waitFor(() => {
        expect(h1).toHaveLength(1);
    })
});

it('should post a new event, when all data is correct', async () => {
    const currentUser = {name: "A"}
    const events = [];
    const setEvents = jest.fn();

    render(<AddEvent currentUser={currentUser} events={events} setEvents={setEvents}/>);

    await waitFor(() => {
        userEvent.type(screen.getByLabelText(/Event name:/i), 'testName');
        userEvent.type(screen.getByLabelText(/Event date:/i), '01.05.22');
    })
});

describe('Inputs fields', () => {
    describe('Event name', () => {
        it('should not show errors after inputting a proper lastname', async () => {
            render(<AddEvent />);

            userEvent.type(screen.getByLabelText(/Event name:/i), 'testName');

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(0);
            });
        });

        it('should show "Required" when input field left empty after clicking on it', async () => {
            render(<AddEvent />);

            userEvent.type(screen.getByLabelText(/Event name:/i), '');
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText('Required');
                expect(errors).toHaveLength(1);
            });
        });

        it('should show error when name is longer than 30 chars', async () => {
            const error = 'Must be 30 characters or less';
            const toLongName = 'a'.repeat(31);
            render(<AddEvent />);

            userEvent.type(screen.getByLabelText(/Event name:/i), toLongName);
            userEvent.tab();

            await waitFor(() => {
                const errors = screen.queryAllByText(error);
                expect(errors).toHaveLength(1);
            });
        });

        describe('Event date:', () => {
            it('should not show errors after inputting a proper date', async () => {
                render(<AddEvent/>);

                userEvent.type(screen.getByLabelText(/Event date:/i), '01.05.22');

                await waitFor(() => {
                    const errors = screen.queryAllByText('Required');
                    expect(errors).toHaveLength(0);
                });
            });
        });
    })
});
