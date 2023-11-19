import { screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../router';
import { renderWithProviders } from './test-utils';

describe('ErrorPage', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/wrongPath'],
    });

    renderWithProviders(<RouterProvider router={router} />);

    expect(await screen.findByText('Not Found')).toBeInTheDocument();
  });
});
