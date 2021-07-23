import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
const axios = require('axios');
jest.mock('axios');

it('should call the Axios get method',  async() => {
    axios.get.mockResolvedValue({
        data: []
    });

    render(<App />);

    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(2);
    })
}); 
