import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
