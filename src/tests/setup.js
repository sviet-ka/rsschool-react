import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from '../mocks/server';
import { productsApi } from '../features/products/products-api-slice';
import { store } from '../app/store';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(productsApi.util.resetApiState());
  cleanup();
});
