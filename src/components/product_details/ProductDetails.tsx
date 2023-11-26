import React, { useCallback } from 'react';
import '../styles/ProductDetails.css';
import { useRouter } from 'next/router';
import { useFetchProductQuery } from '../../features/products/products-api-slice';
import ErrorPage from '../../../pages/404';

const ProductDetails: React.FC = () => {
  const router = useRouter();

  const productId = Number(router.query.product);
  const { data, isFetching, isLoading, isSuccess, isError } =
    useFetchProductQuery(productId);

  const handleCloseBtnClick = useCallback(() => {
    router.push({
      pathname: '/',
    });
  }, [router]);

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
