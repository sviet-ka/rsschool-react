export interface Product {
  title: string;
  id: number;
  description: string;
}

const BASE_URL = 'https://dummyjson.com';

const searchProducts = async (searchString: string): Promise<Product[]> => {
  const url = searchString
    ? `${BASE_URL}/products/search?q=${searchString}`
    : `${BASE_URL}/products`;
  const response = await fetch(url);
  const res = await response.json();
  return res.products;
};

export { searchProducts };
