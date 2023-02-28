import React, { createContext, useState } from 'react';

export const CurrencyContext = createContext();

const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('TDD');
  const [exchangeRates, setExchangeRates] = useState({
    TDD: 1,
    USD: 0.15,
    EUR: 0.14,
    GBP: 0.12,
    CAD: 0.2
  });

  const updateCurrency = newCurrency => {
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRates, updateCurrency }}>{children}</CurrencyContext.Provider>
  );
};

export default CurrencyContextProvider;
