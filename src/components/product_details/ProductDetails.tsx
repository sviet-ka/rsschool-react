import React, { useCallback } from 'react';
// import { Product, getProduct } from '../../services/ProductsService';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { useFetchProductQuery } from '../../features/products/products-api-slice';
import ErrorPage from '../pages/not_found_page/NotFoundPage';

const ProductDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productId = Number(searchParams.get('product'));
  const { data, isFetching, isLoading, isSuccess, isError } =
    useFetchProductQuery(productId);

  const handleCloseBtnClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (isSuccess) {
    return (
      <>
        <div className="product-details">
          <div>
            Product: {data.title}
            <button onClick={handleCloseBtnClick}>Close</button>
          </div>
          <div>{data.description}</div>
          <div>Price: ${data.price}</div>
          <div>
            {data.images.map((imageSrc: string, i: number) => (
              <img key={imageSrc} src={imageSrc} alt={`image of ${i}`} />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default ProductDetails;
