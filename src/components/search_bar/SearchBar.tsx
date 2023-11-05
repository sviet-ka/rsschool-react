import React from 'react';
import './SearchBar.css';
interface SearchBarProps {
  searchValue: string;
  onSearchValueChange: (searchValue: string) => void;
  onSearch: (searchString: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  onSearchValueChange,
  onSearch,
}) => {
  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onSearchValueChange(e.target.value);
  };

  const handleSearchBtnClick = (): void => {
    onSearch(searchValue.trim());
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
