import React, { useCallback, useEffect, useState } from 'react';
import './MainPage.css';
import SearchBar from '../../../components/search_bar/SearchBar';
import { Product } from '../../../services/ProductsService';
import SearchResults from '../../../components/search_results/SearchResults';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { Pagination } from '../../pagination/Pagination';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

const MainPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isThrowButtonClicked, setisThrowButtonClicked] =
    useState<boolean>(false);
  const [currentPage] = useState<number>(
    (Number(searchParams.get('page')) || 1) - 1
  );

  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', String(currentPage + 1));
      return params;
    });
  }, [currentPage, setSearchParams]);

  const handleThrowErrow = (): void => {
    setisThrowButtonClicked(true);
  };

  const handleItemSelect = useCallback(
    (product: Product) => {
      navigate('/details');
      setSearchParams((params) => {
        params.set('product', String(product.id));
        return params;
      });
    },
    [navigate, setSearchParams]
  );

  if (isThrowButtonClicked) {
    throw new Error('I crashed!');
  }

  return (
    <Provider store={store}>
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
          <Outlet />
        </div>
      </div>
    </Provider>
  );
};

export default MainPage;
