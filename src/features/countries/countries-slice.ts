import { createSlice } from '@reduxjs/toolkit';
import { countryList } from './country-list.js';

export const SEARCH_INPUT_VALUE_STORAGE_KEY: string = 'searchInputValue';

export const countrySlice = createSlice({
  name: 'countries',
  initialState: { countryList },
  reducers: {},
});

export default countrySlice.reducer;
