import React, { useContext } from 'react';
import Link from 'next/link';
import { urlFor } from '../Lib/client';
import { CurrencyContext } from '../contexts/CurrencyContext';

const Product = ({ product: { image, name, slug, price } }) => {
  const { currency, exchangeRates } = useContext(CurrencyContext);
  const convertedPrice = price * exchangeRates[currency];

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image && image[0])} width={250} height={250} className="product-image" />
          <p className="product-name">{name}</p>
          <p className="product-price">
            {convertedPrice.toFixed(2)} {currency}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
