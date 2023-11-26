import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchResults from '../components/search_results/SearchResults';
import { renderWithProviders } from './test-utils';
import { server } from '../mocks/server';
import { HttpResponse, http } from 'msw';

describe('SearchResults', () => {
  it('Verify the SearchResults component renders the specified number of results', async () => {
    renderWithProviders(<SearchResults />);

    const cards = await screen.findAllByRole('result-row');
    expect(cards).toHaveLength(2);
    expect(screen.queryByText('No products found')).toBeNull();
  });

  it('Verify the appropriate message is displayed if no cards are present.', async () => {
    server.use(
      http.get('https://dummyjson.com/products', () =>
        HttpResponse.json({
          products: [],
          total: 0,
          skip: 0,
          limit: 10,
        })
      )
    );
    renderWithProviders(<SearchResults />);

    const message = await screen.findByText('No products found');

    expect(message).toBeInTheDocument();
  });
});
