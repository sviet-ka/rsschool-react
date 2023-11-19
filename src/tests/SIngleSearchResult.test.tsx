import { act, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchResults from '../components/search_results/SearchResults';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import { server } from '../mocks/server';
import { renderWithProviders } from './test-utils';

describe('Single Search Result', () => {
  it('Verify that clicking triggers an additional API call to fetch detailed information', async () => {
    const requestSpy = vi.fn();
    server.events.on('request:start', requestSpy);
    renderWithProviders(<RouterProvider router={router} />);

    const rowResults = await screen.findAllByRole('result-row');
    act(() => {
      rowResults.at(0)?.click();
    });

    expect(requestSpy).toHaveBeenCalled();
  });

  it('Verify that the card component renders the relevant card data', async () => {
    renderWithProviders(<SearchResults />);

    expect(await screen.findByText('title1')).toBeInTheDocument();
    expect(await screen.findByText('description1')).toBeInTheDocument();
  });

  it('Verify that clicking on a card opens a detailed card component', async () => {
    renderWithProviders(<RouterProvider router={router} />);

    const rowResults = await screen.findAllByRole('result-row');
    act(() => {
      rowResults.at(0)?.click();
    });

    expect(await screen.findByText('Product: title1')).toBeInTheDocument();
  });
});
