import React from 'react';
import '../styles/SearchBar.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  updateSearchString,
  startSearch,
  updateSearchInputValue,
} from '../../features/search/search-slice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchInputValue = useAppSelector(
    (state) => state.search.searchInputValue
  );
  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(updateSearchInputValue(e.target.value));
  };

  return (
    <div className="section">
      <input
        role="search-bar"
        className="search-input"
        value={searchInputValue}
        onChange={handleSearchInputChange}
      />
      <button
        onClick={() => {
          dispatch(startSearch());
          dispatch(updateSearchString(searchInputValue));
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
