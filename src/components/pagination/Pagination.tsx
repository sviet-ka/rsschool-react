import React from 'react';
import '../styles/Pagination.css';
import { useFetchProductsQuery } from '../../features/products/products-api-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  updateCurrentPage,
  updateItemsPerPage,
} from '../../features/search/search-slice';
import { useRouter } from 'next/router';

export interface PaginationEvent {
  page: number;
  pageSize: number;
}

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.search.currentPage);
  const pageSize = useAppSelector((state) => state.search.itemsPerPage);
  const searchString = useAppSelector((state) => state.search.searchString);
  const router = useRouter();

  const { data, isSuccess, isLoading, isError } = useFetchProductsQuery({
    searchString,
    page: currentPage,
    pageSize,
  });

  const handlePrevClick = () => {
    const pageNumber = currentPage - 1;
    dispatch(updateCurrentPage(pageNumber));
    dispatch(updateItemsPerPage(pageSize));
    router.query.page = String(pageNumber + 1);
    router.push(router);
  };

  const handleNextClick = () => {
    const pageNumber = currentPage + 1;
    dispatch(updateCurrentPage(pageNumber));
    dispatch(updateItemsPerPage(pageSize));
    router.query.page = String(pageNumber + 1);
    router.push(router);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCurrentPage(0));
    dispatch(updateItemsPerPage(Number(e.target.value)));
  };

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <></>;
  }

  if (isSuccess) {
    return (
      <>
        <div className="pagination-bar">
          <select
            onChange={handlePageSizeChange}
            className="select"
            value={pageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <div>
            <button
              className="btn"
              onClick={handlePrevClick}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <button
              className="btn"
              onClick={handleNextClick}
              disabled={currentPage === Math.ceil(data.total / pageSize) - 1}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
};
