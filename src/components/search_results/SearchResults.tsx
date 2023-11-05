import React from 'react';
import { Product } from '../../services/ProductsService';
import './SearchResults.css';

interface SearchResultsProps {
  results: Product[];
  onItemSelect: (item: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onItemSelect,
}) => {
  return (
    <>
      <div>
        {results.map((product: Product) => (
          <div
            className="result-row"
            key={product.id}
            onClick={() => onItemSelect(product)}
          >
            <div className="result-row-name">
              <div className="title-row cell-content">{product.title}</div>
            </div>
            <div>
              <div className="cell-content">{product.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
