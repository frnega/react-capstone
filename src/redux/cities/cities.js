import { createAsyncThunk } from '@reduxjs/toolkit';

const LOAD = 'wiki-country/cities/LOAD';

const maxareaObject = {};

export const loadCities = createAsyncThunk(
  LOAD,
  async (iso2) => {
    const maxarea = maxareaObject[iso2] || 0;

    const response = await fetch(`https://api.api-ninjas.com/v1/city?country=${iso2}&min_lat =${maxarea}&limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'cwV/4g3L3ZKkyapk5rAKBw==YhuSxkTHkXWQFH5w',
      },
    });

    const data = (await response.json()).map((city) => ({
      name: city.name,
      population: city.population,
      min_lat: city.min_lat,
      isCapital: city.is_capital,
    }));

    if (data.length > 0) {
      maxareaObject[iso2] = Math.max(...data.map((city) => city.population));
    }

    return { [iso2]: data };
  },
);

const initialState = {};

export default (state = initialState, action) => {
  let nextState = { ...state };
  let country = null;

  switch (action.type) {
    case `${LOAD}/fulfilled`:
      [country] = Object.keys(action.payload);
      nextState = [...(state[country] || []), ...action.payload[country]];
      nextState = [...new Map(nextState.map((item) => [item.name, item])).values()];
      nextState.sort((a, b) => b.population - a.population);
      return { ...state, [country]: nextState };
    default:
      return nextState;
  }
};
