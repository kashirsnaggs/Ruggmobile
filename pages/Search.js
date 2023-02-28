import { useState, useEffect } from 'react';
import { client } from '../Lib/client';
import { Product, HeroBanner } from '../components';

const ProductsPage = ({ products, bannerData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Filter products based on search query, category, and price range
    const filtered = products.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
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
    setFilteredProducts(filtered);
  }, [searchQuery, category, priceRange, products]);

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handlePriceRangeChange = e => {
    setPriceRange(e.target.value);
  };

  return (
    <div>
      <div className="banner animated tada">
        <div className=" big-text animated tada">Car Parts Sold</div>
        <div>Full Car Parts</div>
        <a href="#">Go to store</a>
      </div>
      <div className="bring-up">
        <form className="form-search">
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
        </form>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="products-container1" style={{ overflowY: 'scroll', maxHeight: '400px' }}>
          {filteredProducts?.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
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

export default ProductsPage;
