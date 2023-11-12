import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProductDetails from '../components/product_details/ProductDetails';
import { MemoryRouter } from 'react-router-dom';

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
});
