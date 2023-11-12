export const SEARCH_INPUT_VALUE_STORAGE_KEY: string = 'searchInputValue';

export const getSearchInputValue = (): string => {
  return localStorage.getItem(SEARCH_INPUT_VALUE_STORAGE_KEY) ?? '';
};

export const saveSearchInputValue = (value: string): void => {
  localStorage.setItem(SEARCH_INPUT_VALUE_STORAGE_KEY, value);
};
