import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProductDetails from '../components/product_details/ProductDetails';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { routes } from '../router';
import { act } from 'react-dom/test-utils';

describe('ProductDetails', () => {
  it('Verify the loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['?product=123']}>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Verify the detailed card component correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter initialEntries={['?product=123']}>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(await screen.findByText('Product: title1')).toBeInTheDocument();
    expect(await screen.findByText('description1')).toBeInTheDocument();
    expect(await screen.findByText('Price: $1')).toBeInTheDocument();
    expect(await screen.findByAltText('image of 0')).toBeInTheDocument();
  });

  it('Verify that clicking the close button hides the component', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/details?page=1&product=123'],
    });
    render(<RouterProvider router={router} />);

    const closeBtn = await screen.findByRole('button', { name: 'Close' });
    act(() => {
      closeBtn.click();
    });

    expect(screen.queryByText('Product: title1')).toBeNull();
  });
});
