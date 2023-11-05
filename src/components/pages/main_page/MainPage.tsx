import React, { useCallback, useEffect, useState } from 'react';
import './MainPage.css';
import SearchBar from '../../../components/search_bar/SearchBar';
import {
  Product,
  ProductsResponse,
  SearchParams,
  searchProducts,
} from '../../../services/ProductsService';

import {
  getSearchInputValue,
  saveSearchInputValue,
} from '../../../services/LocalStorageService';
import SearchResults from '../../../components/search_results/SearchResults';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import Pagination, { PaginationEvent } from '../../pagination/Pagination';

const MainPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [response, setResponse] = useState<ProductsResponse>();
  const [isLoaded, setisLoaded] = useState<boolean>(true);
  const [isThrowButtonClicked, setisThrowButtonClicked] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    (Number(searchParams.get('page')) || 1) - 1
  );
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>(
    getSearchInputValue()
  );
  const [searchInputValue, setSearchInputValue] = useState<string>(
    getSearchInputValue()
  );

  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', String(currentPage + 1));
      return params;
    });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const fetchProducts = async (searchParams: SearchParams) => {
      setisLoaded(false);
      const productsResponse = await searchProducts(searchParams);
      setResponse(productsResponse);
      setisLoaded(true);
    };

    fetchProducts({
      searchString,
      page: currentPage,
      pageSize,
    });
  }, [currentPage, pageSize, searchString]);

  const handleSearchValueChange = useCallback((newSearchString: string) => {
    setSearchInputValue(newSearchString);
  }, []);

  const handleSearch = useCallback(
    async (newSearchString: string): Promise<void> => {
      setSearchString(newSearchString);
      saveSearchInputValue(newSearchString);
      setSearchInputValue(newSearchString);
      setCurrentPage(0);
    },
    []
  );

  const handleThrowErrow = (): void => {
    setisThrowButtonClicked(true);
  };

  const handlePagination = useCallback(
    async ({ page, pageSize }: PaginationEvent): Promise<void> => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
    []
  );

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
    <div className="container">
      <SearchBar
        searchValue={searchInputValue}
        onSearchValueChange={handleSearchValueChange}
        onSearch={handleSearch}
      ></SearchBar>
      <div>
        <button className="throw-error-button" onClick={handleThrowErrow}>
          Throw Error
        </button>
      </div>
      {isLoaded ? (
        <div className="results-container">
          <div className="results-list">
            <SearchResults
              results={response?.products ?? []}
              onItemSelect={handleItemSelect}
            ></SearchResults>
            <Pagination
              totalItems={response?.total ?? 0}
              currentPage={currentPage}
              pageSize={pageSize}
              onPaginationChange={handlePagination}
            />
          </div>
          <Outlet />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MainPage;
