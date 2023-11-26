import axios from 'axios';

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
};

const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
  return response.data;
};

export { searchProducts, getProduct };
