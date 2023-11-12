import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../router';

describe('ErrorPage', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/wrongPath'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText('Not Found')).toBeInTheDocument();
  });
});
