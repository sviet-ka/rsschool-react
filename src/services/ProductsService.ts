import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
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

const BASE_URL = 'https://dummyjson.com';

const searchProducts = async ({
  searchString = '',
  page = 0,
  pageSize = 10,
}: SearchParams): Promise<ProductsResponse> => {
  const url = searchString
    ? `${BASE_URL}/products/search`
    : `${BASE_URL}/products`;
  const response = await axios.get<ProductsResponse>(url, {
    params: {
      q: searchString,
      skip: page * pageSize,
      limit: pageSize,
    },
  });
  return response.data;
  // console.log('searchProducts call');

  // return {
  //   products: [{ id: 1, title: 'prod 1', description: 'prod 1 desc' }],
  //   total: 1,
  //   skip: 0,
  //   limit: 10,
  // };
};

export { searchProducts };
