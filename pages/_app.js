import React from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import createCache from '@emotion/cache';
import CurrencyContextProvider from '../contexts/CurrencyContext';

import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Payout from '../components/Payout';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <UserProvider>
        <Layout>
          <Toaster />

          <CurrencyContextProvider>
            <Component {...pageProps} />
          </CurrencyContextProvider>
        </Layout>
      </UserProvider>
    </StateContext>
  );
}

export default MyApp;
