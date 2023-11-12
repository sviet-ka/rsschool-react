import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/error_boundary/ErrorBoundry';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <RouterProvider router={router} />
  </ErrorBoundary>
  // </React.StrictMode>
);
