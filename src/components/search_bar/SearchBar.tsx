import { Component, ReactNode } from 'react';

interface SearchBarProps {
  onSearch: (searchString: string) => void;
}

interface SearchBarState {
  searchValue: string;
}

const SEARCH_INPUT_VALUE_STORAGE_KEY: string = 'searchInputValue';

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = { searchValue: '' };

  componentDidMount() {
    const searchInputValue = this.getSearchInputValue();
    this.setState({
      searchValue: searchInputValue,
    });
    this.props.onSearch(searchInputValue);
  }

  saveSearchInputValue = (value: string): void => {
    localStorage.setItem(SEARCH_INPUT_VALUE_STORAGE_KEY, value);
  };

  getSearchInputValue = (): string => {
    return localStorage.getItem(SEARCH_INPUT_VALUE_STORAGE_KEY) ?? '';
  };

  handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearchBtnClick = (): void => {
    const trimmedSearchValue = this.state.searchValue.trim();
    this.setState({
      searchValue: trimmedSearchValue,
    });
    this.saveSearchInputValue(trimmedSearchValue);
    this.props.onSearch(trimmedSearchValue);
  };

  render(): ReactNode {
    return (
      <div>
        <input
          value={this.state.searchValue}
          onChange={this.handleSearchInputChange}
        />
        <button onClick={this.handleSearchBtnClick}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
