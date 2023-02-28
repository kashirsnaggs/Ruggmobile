import React from 'react';
import Link from 'next/link';

import { urlFor } from '../Lib/client';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"></link>
      <div>
        <p className="beats-solo" style={{ fontFamily: '"Rajdhani", sans-serif' }}>
          {heroBanner.smallText}
        </p>
        <h3 style={{ fontFamily: '"Rajdhani", sans-serif' }}>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <a>
              <button type="button">{heroBanner.buttonText}</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
