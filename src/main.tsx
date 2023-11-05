import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/error_boundary/ErrorBoundry';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/pages/not_found_page/NotFoundPage';
import ProductDetails from './components/product_details/ProductDetails';

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <RouterProvider router={router} />
  </ErrorBoundary>
  // </React.StrictMode>
);
