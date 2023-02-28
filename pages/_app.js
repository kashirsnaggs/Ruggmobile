import React from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import createCache from '@emotion/cache';
import CurrencyContextProvider from '../contexts/CurrencyContext';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

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
          <PayPalScriptProvider deferLoading={true}>
            <CurrencyContextProvider>
              <Component {...pageProps} />
            </CurrencyContextProvider>
          </PayPalScriptProvider>
        </Layout>
      </UserProvider>
    </StateContext>
  );
}

export default MyApp;
