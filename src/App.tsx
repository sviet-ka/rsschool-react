import { Component, ReactNode } from 'react';
import './App.css';
import SearchBar from './components/search_bar/SearchBar';
import { Movie, searchMovies } from './services/MovieService';
import SearchResults from './components/search_results/SearchResults';

interface AppState {
  results: Movie[];
  isLoaded: boolean;
}
class App extends Component<object, AppState> {
  state = { results: [], isLoaded: true };

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

  render(): ReactNode {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch}></SearchBar>
        {this.state.isLoaded ? (
          <SearchResults results={this.state.results}></SearchResults>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default App;
