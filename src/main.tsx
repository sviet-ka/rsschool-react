import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UncontrolledForm from './components/UncontrolledForm/UncontolledForm';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ControlledForm from './components/ControlledForm/ControlledForm';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/uncontrolled-form', element: <UncontrolledForm /> },
  { path: '/controlled-form', element: <ControlledForm /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
