import React, { useEffect, useState } from 'react';
import './SearchBar.css';
interface SearchBarProps {
  onSearch: (searchString: string) => void;
}

const SEARCH_INPUT_VALUE_STORAGE_KEY: string = 'searchInputValue';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const searchInputValue = getSearchInputValue();
    setSearchValue(searchInputValue);
    onSearch(searchInputValue);
  }, [onSearch]);

  const getSearchInputValue = (): string => {
    return localStorage.getItem(SEARCH_INPUT_VALUE_STORAGE_KEY) ?? '';
  };

  const saveSearchInputValue = (value: string): void => {
    localStorage.setItem(SEARCH_INPUT_VALUE_STORAGE_KEY, value);
  };

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(e.target.value);
  };

  const handleSearchBtnClick = (): void => {
    const trimmedSearchValue = searchValue.trim();
    setSearchValue(trimmedSearchValue);
    saveSearchInputValue(trimmedSearchValue);
    onSearch(trimmedSearchValue);
  };

  return (
    <div className="section">
      <input
        className="search-input"
        value={searchValue}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearchBtnClick}>Search</button>
    </div>
  );
};

export default SearchBar;
