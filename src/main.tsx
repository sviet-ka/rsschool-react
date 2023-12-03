import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UncontrolledForm from './components/UncontrolledForm/UncontolledForm';
import { Provider } from 'react-redux';
import { store } from './app/store';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/uncontrolled-form', element: <UncontrolledForm /> },
  { path: '/controlled-form', element: <h1>ControlledForm</h1> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
