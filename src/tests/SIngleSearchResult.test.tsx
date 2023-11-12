import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProductsContext } from '../contexts/ProductsContext';
import SearchResults from '../components/search_results/SearchResults';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import { server } from '../mocks/server';

const products = [
  {
    id: 1,
    brand: 'brand1',
    category: 'category1',
    description: 'description1',
    images: ['img1'],
    price: 1,
    rating: 1,
    title: 'title1',
  },
];

describe('ProductDetails', () => {
  it('Verify that the card component renders the relevant card data', async () => {
    render(
      <>
        <ProductsContext.Provider value={products}>
          <SearchResults />
        </ProductsContext.Provider>
      </>
    );
    expect(screen.getByText('title1')).toBeInTheDocument();
    expect(screen.getByText('description1')).toBeInTheDocument();
  });

  it('Verify that clicking on a card opens a detailed card component', async () => {
    render(<RouterProvider router={router} />);

    const rowResult = await screen.findByRole('result-row');
    act(() => {
      rowResult.click();
    });

    expect(await screen.findByText('Product: title1')).toBeInTheDocument();
  });

  it('Verify that clicking triggers an additional API call to fetch detailed information', async () => {
    const requestSpy = vi.fn();
    server.events.on('request:start', requestSpy);
    render(<RouterProvider router={router} />);

    const rowResult = await screen.findByRole('result-row');
    act(() => {
      rowResult.click();
    });

    expect(requestSpy).toHaveBeenCalled();
  });
});
