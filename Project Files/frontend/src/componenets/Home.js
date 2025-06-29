import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="page-title">Welcome to ShopSmart Grocery Store</h1>
      <p className='page'>Get fresh groceries delivered at your doorstep</p>

      <div className="home-image-container">
        <img 
          src="/fruits.jpg" 
          alt="Fruits and Vegetables" 
          className="home-image"
        />
      </div>
    </div>
  );
}

export default Home;
