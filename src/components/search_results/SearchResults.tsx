import { Component, ReactNode } from 'react';
import { Movie } from '../../services/MovieService';

interface SearchResultsProps {
  results: Movie[];
}

interface SearchResultsState {
  isThrowButtonClicked: boolean;
}

class SearchResults extends Component<SearchResultsProps, SearchResultsState> {
  state = {
    isThrowButtonClicked: false,
  };

  handleThrowErrow = (): void => {
    this.setState({
      isThrowButtonClicked: true,
    });
    throw Error('Test error occured');
  };

  render(): ReactNode {
    if (this.state.isThrowButtonClicked) {
      throw new Error('I crashed!');
    }
    return (
      <>
        <div>
          {this.props.results.map((movie: Movie) => (
            <div key={movie.id}>
              <div>{movie.title}</div>
              <div>{movie.overview}</div>
            </div>
          ))}
        </div>
        <button onClick={this.handleThrowErrow}> Throw Error</button>
      </>
    );
  }
}

export default SearchResults;
