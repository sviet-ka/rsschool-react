import React, { useCallback, useEffect, useState } from 'react';
import { Product, getProduct } from '../../services/ProductsService';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [isLoaded, setisLoaded] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = Number(searchParams.get('product'));
      if (!productId) {
        return;
      }
      setisLoaded(false);
      const newProduct = await getProduct(productId);
      setProduct(newProduct);
      setisLoaded(true);
    };
    fetchProduct();
  }, [searchParams]);

  const handleCloseBtnClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div>
      {isLoaded ? (
        product && (
          <div className="product-details">
            <div>
              Product: {product.title}
              <button onClick={handleCloseBtnClick}>Close</button>
            </div>
            <div>{product.description}</div>
            <div>Price: ${product.price}</div>
            <div>
              {product.images.map((imageSrc: string) => (
                <img key={imageSrc} src={imageSrc} />
              ))}
            </div>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;
