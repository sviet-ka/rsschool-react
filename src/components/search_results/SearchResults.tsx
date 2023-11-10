import React, { useContext } from 'react';
import { Product } from '../../services/ProductsService';
import './SearchResults.css';
import { ProductsContext } from '../../contexts/ProductsContext';

interface SearchResultsProps {
  onItemSelect: (item: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onItemSelect }) => {
  const results = useContext(ProductsContext);
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
