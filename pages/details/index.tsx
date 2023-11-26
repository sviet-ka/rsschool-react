import React from 'react';
import Layout from '../../src/components/layout/Layout';
import ProductDetails from '../../src/components/product_details/ProductDetails';
import { wrapper } from '../../src/app/store';
import {
  productsApi,
  getRunningQueriesThunk,
} from '../../src/features/products/products-api-slice';

const Details: React.FC = () => {
  return (
    <Layout>
      <ProductDetails></ProductDetails>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const productId = Number(context.query.productId);

    if (productId) {
      store.dispatch(productsApi.endpoints.fetchProduct.initiate(productId));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default Details;
