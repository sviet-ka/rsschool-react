import React, { useCallback, useEffect, useState } from 'react';
import './MainPage.css';
import SearchBar from '../../../components/search_bar/SearchBar';
import {
  ProductsResponse,
  SearchParams,
  searchProducts,
} from '../../../services/ProductsService';

import {
  getSearchInputValue,
  saveSearchInputValue,
} from '../../../services/LocalStorageService';
import SearchResults from '../../../components/search_results/SearchResults';
import PaginationComponent, {
  Pagination,
} from '../../pagination_component/PaginationComponent';

const MainPage: React.FC = () => {
  const [response, setResponse] = useState<ProductsResponse>();
  const [isLoaded, setisLoaded] = useState<boolean>(true);
  const [isThrowButtonClicked, setisThrowButtonClicked] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>(
    getSearchInputValue()
  );
  const [searchInputValue, setSearchInputValue] = useState<string>(
    getSearchInputValue()
  );

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
    async ({ page, pageSize }: Pagination): Promise<void> => {
      setCurrentPage(page);
      setPageSize(pageSize);
    },
    []
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
        <>
          <SearchResults results={response?.products ?? []}></SearchResults>
          <PaginationComponent
            totalItems={response?.total ?? 0}
            currentPage={currentPage}
            pageSize={pageSize}
            onPaginationChange={handlePagination}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MainPage;
