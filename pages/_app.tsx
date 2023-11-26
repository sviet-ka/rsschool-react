import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store, wrapper } from '../src/app/store';

export function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(App);
