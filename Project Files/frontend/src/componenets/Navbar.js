import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import './Navbar.css';

function Navbar({ setSearchTerm }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Add this to fix the error
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setSearchTerm(value); // Call parent's function to update filter
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Left Side */}
        <div className="nav-left">
          <Link to="/" className="brand">
            <ShoppingCart className="brand-icon" />
            <span className="brand-text">
              <span className="brand-part1">Shop</span>
              <span className="brand-part2">
                Smart
                <svg className="brand-arrow" width="40" height="10" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0 C10 10, 30 10, 40 0" stroke="#ffc107" strokeWidth="2" fill="transparent" />
                  <path d="M38 0 L40 2 M38 0 L40 -2" stroke="#ffc107" strokeWidth="2" fill="transparent" />
                </svg>

              </span>
            </span>
          </Link>

          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : undefined}>Home</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active-link' : undefined}>Products</NavLink></li>
            <li><NavLink to="/cart" className={({ isActive }) => isActive ? 'active-link' : undefined}>Cart</NavLink></li>
            <li><NavLink to="/orders" className={({ isActive }) => isActive ? 'active-link' : undefined}>Orders</NavLink></li>
            <li><NavLink to="/feedback" className={({ isActive }) => isActive ? 'active-link' : undefined}>Feedback</NavLink></li>
          </ul>
        </div>

        {/* ✅ Wrap the search and user info in nav-right */}
        <div className="nav-right">
          <div className="search-box">
            <span className="search-icon"><Search size={16} /></span>
            <input
              type="text"
              placeholder="Search products"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>

          {user ? (
            <>
              <span className="user-greet">Hello, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link' : undefined}>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? 'active-link' : undefined}>Signup</NavLink>
            </>
          )}
        </div>

      </div>
    </nav>
  );

}

export default Navbar;
