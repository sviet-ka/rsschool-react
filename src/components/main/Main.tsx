import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/MainPage.css';
import SearchBar from '../search_bar/SearchBar';
import { Product } from '../../services/ProductsService';
import SearchResults from '../search_results/SearchResults';
import { Pagination } from '../pagination/Pagination';

const Main: React.FC = () => {
  const router = useRouter();
  const [isThrowButtonClicked, setisThrowButtonClicked] =
    useState<boolean>(false);

  const handleThrowErrow = (): void => {
    setisThrowButtonClicked(true);
  };

  const handleItemSelect = useCallback(
    (product: Product) => {
      router.push({
        pathname: '/details',
        query: { product: String(product.id) },
      });
    },
    [router]
  );

  if (isThrowButtonClicked) {
    throw new Error('I crashed!');
  }

  return (
    <div className="container">
      <SearchBar></SearchBar>
      <div>
        <button className="throw-error-button" onClick={handleThrowErrow}>
          Throw Error
        </button>
      </div>
      <div className="results-container">
        <div className="results-list">
          <SearchResults onItemSelect={handleItemSelect}></SearchResults>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Main;
