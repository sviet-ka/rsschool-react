import { createContext } from 'react';
import { Product } from '../services/ProductsService';

export const ProductsContext = createContext<Product[]>([]);
