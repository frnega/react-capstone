import { createAsyncThunk } from '@reduxjs/toolkit';

const LOAD = 'wiki-country/countries/LOAD';

let minPopulation = 0;

export const loadCountries = createAsyncThunk(
  LOAD,
  async () => {
    const response = await fetch(`https://api.api-ninjas.com/v1/country?min_population =${minPopulation}&limit=30`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'cwV/4g3L3ZKkyapk5rAKBw==YhuSxkTHkXWQFH5w',
      },
    });

    const data = (await response.json()).map((country) => ({
      name: country.name,
      population: parseInt(country.population, 10) * 1000,
      iso2: country.iso2,
      flag: `https://countryflagsapi.com/png/${country.iso2.toLowerCase()}`,
      map: `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${country.iso2.toLowerCase()}/128.png`,
    }));

    if (data.length > 0) {
      minPopulation = Math.max(...(data).map((country) => parseInt(country.population / 1000, 10)));
    }

    return data;
  },
);

const initialState = [];

export default (state = initialState, action) => {
  let nextState = [...state];

  switch (action.type) {
    case `${LOAD}/fulfilled`:
      nextState = [...state, ...action.payload];
      nextState = [...new Map(nextState.map((item) => [item.iso2, item])).values()];
      nextState.sort((a, b) => b.population - a.population);
      return nextState;
    default:
      return nextState;
  }
};
