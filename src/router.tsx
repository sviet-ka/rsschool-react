import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from '../pages/404';
import ProductDetails from '../pages/details';

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
