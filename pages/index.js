import React, { useState, useContext } from 'react';
import { client } from '../Lib/client';
import { Product, FooterBanner, HeroBanner, CurrencySelector } from '../components';
import WhatsApp from '../components/Whatsapp';

const Home = ({ products, bannerData }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handlePriceRangeChange = e => {
    setPriceRange(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    if (category && product.category !== category) {
      return false;
    }
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(parseFloat);
      if (product.price < min || product.price > max) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}

      <div className="products-heading">
        <h2>Best Selling products</h2>
        <p>products You can Look to buy</p>
      </div>
      <CurrencySelector />

      {/* <form>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="phone">Phone</option>
            <option value="laptops">Laptops</option>
            <option value="electronics">Electronics</option>
            <option value="brands">Brands</option>
          </select>
        </label>
        <label>
          Price Range:
          <select value={priceRange} onChange={handlePriceRangeChange}>
            <option value="">All</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-1050">$1000 - $1050</option>
            <option value="1050-1100">$1050 - $1100</option>
          </select>
        </label>
      </form> */}

      <div className="products-container">
        {filteredProducts?.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
      <WhatsApp />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  };
};

export default Home;
