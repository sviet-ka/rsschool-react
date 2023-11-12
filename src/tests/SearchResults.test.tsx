import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchResults from '../components/search_results/SearchResults';
import { ProductsContext } from '../contexts/ProductsContext';

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
  {
    id: 2,
    brand: 'brand2',
    category: 'category2',
    description: 'description2',
    images: ['img2'],
    price: 2,
    rating: 2,
    title: 'title1',
  },
];

describe('SearchResults', () => {
  it('Verify the SearchResults component renders the specified number of results', async () => {
    render(
      <>
        <ProductsContext.Provider value={products}>
          <SearchResults />
        </ProductsContext.Provider>
      </>
    );

    const cards = await screen.findAllByRole('result-row');
    expect(cards).toHaveLength(2);
    expect(screen.queryByText('No products found')).toBeNull();
  });

  it('Verify the appropriate message is displayed if no cards are present.', async () => {
    render(
      <>
        <ProductsContext.Provider value={[]}>
          <SearchResults />
        </ProductsContext.Provider>
      </>
    );

    const message = await screen.findByText('No products found');

    expect(message).toBeInTheDocument();
  });
});
