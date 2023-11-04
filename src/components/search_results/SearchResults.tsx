import React from 'react';
import { Product } from '../../services/ProductsService';
import './SearchResults.css';

interface SearchResultsProps {
  results: Product[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <>
      <div className="section">
        {results.map((movie: Product) => (
          <div className="result-row" key={movie.id}>
            <div className="result-row-name">
              <div className="title-row cell-content">{movie.title}</div>
            </div>
            <div>
              <div className="cell-content">{movie.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
