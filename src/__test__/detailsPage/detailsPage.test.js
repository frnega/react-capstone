import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

const jsonCountry = {
  json: () => Promise.resolve([
    {
      name: 'Rwanda',
      population: '12952',
      iso2: 'RW',
    },
  ]),
};

const jsonCity = {
  json: () => Promise.resolve([
    {
      name: 'Kigali',
      population: '745261',
      is_capital: true,
    },
    {
      name: 'Nyanza',
      population: '225209',
      is_capital: false,
    },
  ]),
};

describe('Details Page for Rwanda', () => {
  it('should render the Rwanda details page', async () => {
    window.fetch = jest.fn().mockImplementationOnce((url) => {
      if (url.includes('city')) {
        return jsonCity;
      }

      return jsonCountry;
    });

    const user = userEvent.setup();
    render(<App />);
    const japanCard = await screen.findByText('Rwanda');
    await user.click(japanCard);
    expect(await screen.queryByText('Kigali')).not.toBeInTheDocument();
    expect(await screen.queryByText('Nyanza')).not.toBeInTheDocument();
  });

  it('should filter with respect to the population', async () => {
    window.fetch = jest.fn().mockImplementationOnce((url) => {
      if (url.includes('city')) {
        return jsonCity;
      }

      return jsonCountry;
    });

    const user = userEvent.setup();
    render(<App />);

    const RwandaCard = await screen.findByText('Rwanda');
    await user.click(RwandaCard);
    const input = await screen.findByRole('spinbutton');
    await user.type(input, '745261');

    expect(await screen.findByText('Rwanda')).toBeInTheDocument();
  });
});
