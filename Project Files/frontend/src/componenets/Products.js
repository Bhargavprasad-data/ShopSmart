// src/components/Products.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import "./Product.css";

function Products({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [added, setAdded] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) || 1 });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    addToCart(product, quantity);
    setAdded(prev => ({ ...prev, [product._id]: true }));
  };

  return (
    <div className="product-page">
      <h2 className="page-title">Products</h2>
      <div className="product-scroll-area">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map(product => {
            const nameParts = product.name.split(new RegExp(`(${searchTerm})`, 'gi'));
            return (
              <div
                key={product._id}
                className="product-card"
                style={{
                  backgroundColor: added[product._id] ? '#dcdcdc' : '#fff',
                }}
              >
                <div>
                  <h4>
                    {nameParts.map((part, i) =>
                      part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <mark key={i} style={{ backgroundColor: 'yellow' }}>{part}</mark>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </h4>
                  <p style={{ color: added[product._id] ? '#ccc' : '#333' }}>
                    Price: ₹{product.price}
                  </p>
                  <input
                    type="number"
                    min="1"
                    value={quantities[product._id] || 1}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    className="product-quantity-input"
                  /><br />
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-button"
                    style={{
                      backgroundColor: added[product._id] ? '#1e7e34' : '#28a745',
                      textDecoration: added[product._id] ? 'line-through' : 'none',
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Products;
