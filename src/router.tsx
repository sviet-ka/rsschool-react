import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/pages/not_found_page/NotFoundPage';
import ProductDetails from './components/product_details/ProductDetails';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'details',
        element: <ProductDetails />,
      },
    ],
  },
];
export const router = createBrowserRouter(routes);
