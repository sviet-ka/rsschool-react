import React from 'react';
import { Product } from '../../services/ProductsService';
import './SearchResults.css';
import { useFetchProductsQuery } from '../../features/products/products-api-slice';
import ErrorPage from '../pages/not_found_page/NotFoundPage';
import { useAppSelector } from '../../app/hooks';

interface SearchResultsProps {
  onItemSelect?: (item: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  onItemSelect = () => {},
}) => {
  const searchString = useAppSelector((state) => state.search.searchString);
  const page = useAppSelector((state) => state.search.currentPage);
  const pageSize = useAppSelector((state) => state.search.itemsPerPage);
  const { data, isFetching, isLoading, isSuccess, isError } =
    useFetchProductsQuery({
      searchString,
      page,
      pageSize,
    });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (isSuccess) {
    return (
      <>
        <div>
          {data.products?.length === 0 && <div>No products found</div>}
          {data.products?.map((product: Product) => (
            <div
              role="result-row"
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
  }
};

export default SearchResults;
