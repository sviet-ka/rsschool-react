import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchResults from '../components/search_results/SearchResults';
import { renderWithProviders } from './test-utils';

describe('Single Search Result', () => {
  it('Verify that the card component renders the relevant card data', async () => {
    renderWithProviders(<SearchResults />);

    expect(await screen.findByText('title1')).toBeInTheDocument();
    expect(await screen.findByText('description1')).toBeInTheDocument();
  });
});
