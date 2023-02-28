import React, { useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyContext';

const CurrencySelector = () => {
  const { currency, updateCurrency } = useContext(CurrencyContext);

  const handleChange = e => {
    updateCurrency(e.target.value);
  };

  return (
    <select className="select" value={currency} onChange={handleChange}>
      <option className="option" class="active" value="TDD">
        TDD
      </option>
      <option className="option" value="USD">
        $-USD
      </option>
      <option className="option" value="EUR">
        €-EUR
      </option>
      <option className="option" value="GBP">
        GBP-GBP
      </option>
      <option className="option" value="CAD">
        C$-CAD
      </option>
    </select>
  );
};

export default CurrencySelector;
