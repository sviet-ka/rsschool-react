import React, { useContext } from 'react';
import './SearchBar.css';
import { SearchContext } from '../../contexts/searchContext';
interface SearchBarProps {
  onSearchValueChange: (searchValue: string) => void;
  onSearch: (searchString: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchValueChange,
  onSearch,
}) => {
  const searchValue = useContext(SearchContext);
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
