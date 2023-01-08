import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Homepage', () => {
  it('should render the homepage', async () => {
    const json = {
      json: () => Promise.resolve([
        {
          name: 'Brazil',
          population: '212559',
          iso2: 'BR',
        },
        {
          name: 'Bangladesh',
          population: '164689',
          iso2: 'BD',
        },
        {
          name: 'Japan',
          population: '126476',
          iso2: 'JP',
        },
      ]),
    };

    window.fetch = jest.fn().mockImplementationOnce(() => json);
    render(<App />);
    await waitFor(() => expect(screen.getByText('Brazil')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Bangladesh')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Japan')).toBeInTheDocument());
  });

  it('should filter with respect to the population', async () => {
    const json = {
      json: () => Promise.resolve([
        {
          name: 'Brazil',
          population: '212559',
          iso2: 'BR',
        },
        {
          name: 'Bangladesh',
          population: '164689',
          iso2: 'BD',
        },
        {
          name: 'Japan',
          population: '126476',
          iso2: 'JP',
        },
      ]),
    };

    window.fetch = jest.fn().mockImplementationOnce(() => json);
    const user = userEvent.setup();
    render(<App />);

    const input = await screen.findByRole('spinbutton');
    await user.type(input, '30000');

    expect(await screen.findByText('Brazil')).toBeInTheDocument();
    expect(await screen.findByText('Bangladesh')).toBeInTheDocument();
    expect(await screen.findByText('Japan')).toBeInTheDocument();
  });
});
