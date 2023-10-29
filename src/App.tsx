import React, { Component, ReactNode } from 'react';
import './App.css';
import SearchBar from './components/search_bar/SearchBar';
import { Movie, searchMovies } from './services/MovieService';
import SearchResults from './components/search_results/SearchResults';

interface AppState {
  results: Movie[];
  isLoaded: boolean;
  isThrowButtonClicked: boolean;
}
class App extends Component<object, AppState> {
  state = { results: [], isLoaded: true, isThrowButtonClicked: false };

  handleSearch = async (searchString: string): Promise<void> => {
    this.setState({
      isLoaded: false,
    });
    const requestResult = await searchMovies(searchString);
    this.setState({
      results: requestResult,
      isLoaded: true,
    });
  };

  handleThrowErrow = (): void => {
    this.setState({
      isThrowButtonClicked: true,
    });
  };

  render(): ReactNode {
    if (this.state.isThrowButtonClicked) {
      throw new Error('I crashed!');
    }
    return (
      <div>
        <SearchBar onSearch={this.handleSearch}></SearchBar>
        <div className="section">
          <button
            className="throw-error-button"
            onClick={this.handleThrowErrow}
          >
            Throw Error
          </button>
        </div>
        {this.state.isLoaded ? (
          <SearchResults results={this.state.results}></SearchResults>
        ) : (
          <div className="section">Loading...</div>
        )}
      </div>
    );
  }
}

export default App;
