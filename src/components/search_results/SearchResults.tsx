import React, { Component, ReactNode } from 'react';
import { Movie } from '../../services/MovieService';
import './SearchResults.css';

interface SearchResultsProps {
  results: Movie[];
}

class SearchResults extends Component<SearchResultsProps> {
  render(): ReactNode {
    return (
      <>
        <div className="section">
          {this.props.results.map((movie: Movie) => (
            <div className="result-row" key={movie.id}>
              <div className="result-row-name">
                <div className="title-row cell-content">{movie.title}</div>
              </div>
              <div>
                <div className="cell-content">{movie.overview}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default SearchResults;
