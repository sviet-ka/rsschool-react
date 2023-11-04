import React, { useCallback, useState } from 'react';
import './MainPage.css';
import SearchBar from '../../../components/search_bar/SearchBar';
import { Product, searchProducts } from '../../../services/ProductsService';
import SearchResults from '../../../components/search_results/SearchResults';

const MainPage: React.FC = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [isLoaded, setisLoaded] = useState<boolean>(true);
  const [isThrowButtonClicked, setisThrowButtonClicked] =
    useState<boolean>(false);

  const handleSearch = useCallback(
    async (searchString: string): Promise<void> => {
      setisLoaded(false);
      const requestResult = await searchProducts(searchString);
      setResults(requestResult);
      setisLoaded(true);
    },
    []
  );
  const handleThrowErrow = (): void => {
    setisThrowButtonClicked(true);
  };

  if (isThrowButtonClicked) {
    throw new Error('I crashed!');
  }
  return (
    <div>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <div className="section">
        <button className="throw-error-button" onClick={handleThrowErrow}>
          Throw Error
        </button>
      </div>
      {isLoaded ? (
        <SearchResults results={results}></SearchResults>
      ) : (
        <div className="section">Loading...</div>
      )}
    </div>
  );
};

export default MainPage;
