import React from 'react';
import './PaginationComponent.css';

interface PaginationComponentProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPaginationChange: (pagination: Pagination) => void;
}

export interface Pagination {
  page: number;
  pageSize: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalItems,
  currentPage,
  pageSize,
  onPaginationChange,
}) => {
  const handlePrevClick = () => {
    onPaginationChange({ page: currentPage - 1, pageSize: Number(pageSize) });
  };

  const handleNextClick = () => {
    onPaginationChange({ page: currentPage + 1, pageSize: Number(pageSize) });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPaginationChange({ page: 0, pageSize: Number(e.target.value) });
  };

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
            disabled={
              currentPage === Math.ceil(totalItems / Number(pageSize)) - 1
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginationComponent;
