import { createSlice } from '@reduxjs/toolkit';
import { countryList } from './country-list.js';

export const countrySlice = createSlice({
  name: 'countries',
  initialState: { countryList },
  reducers: {},
});

export default countrySlice.reducer;
