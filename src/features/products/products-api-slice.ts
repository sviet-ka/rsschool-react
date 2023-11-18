import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  brand: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  title: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchParams {
  searchString?: string;
  page?: number;
  pageSize?: number;
}

const BASE_URL = 'https://dummyjson.com/';
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<
      ProductsResponse,
      { searchString?: string; page?: number; pageSize?: number }
    >({
      query: ({ searchString = '', page = 0, pageSize = 10 }) => ({
        url: searchString ? 'products/search' : 'products',
        params: {
          q: searchString,
          skip: page * pageSize,
          limit: pageSize,
        },
      }),
    }),
    fetchProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductQuery } = productsApi;
