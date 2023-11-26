import { createSlice } from '@reduxjs/toolkit';

export const SEARCH_INPUT_VALUE_STORAGE_KEY: string = 'searchInputValue';
let searchInputValue = '';
if (typeof window !== 'undefined') {
  searchInputValue = localStorage.getItem(SEARCH_INPUT_VALUE_STORAGE_KEY) ?? '';
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchInputValue,
    itemsPerPage: 10,
    currentPage: 0,
    searchString: searchInputValue,
  },
  reducers: {
    startSearch: (state) => {
      localStorage.setItem(
        SEARCH_INPUT_VALUE_STORAGE_KEY,
        state.searchInputValue
      );
    },
    updateSearchInputValue: (state, action) => {
      state.searchInputValue = action.payload;
    },
    updateItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const {
  startSearch,
  updateSearchInputValue,
  updateItemsPerPage,
  updateCurrentPage,
  updateSearchString,
} = searchSlice.actions;

export default searchSlice.reducer;
