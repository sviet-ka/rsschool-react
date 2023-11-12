import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SEARCH_INPUT_VALUE_STORAGE_KEY } from '../services/LocalStorageService';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';

describe('SearchBar', () => {
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(<RouterProvider router={router} />);
    const searchInput = screen.getByRole('search-bar');
    fireEvent.change(searchInput, {
      target: { value: 'test123' },
    });

    const searchBtn = screen.getByRole('button', { name: 'Search' });
    act(() => {
      searchBtn.click();
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      SEARCH_INPUT_VALUE_STORAGE_KEY,
      'test123'
    );
  });

  it('Verify that the component retrieves the value from the local storage upon mounting', async () => {
    render(<RouterProvider router={router} />);

    expect(getItemSpy).toHaveBeenCalledWith(SEARCH_INPUT_VALUE_STORAGE_KEY);
  });
});
