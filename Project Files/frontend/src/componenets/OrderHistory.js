// src/components/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }
      setUserName(user.name || '');
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${user._id}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading orders...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div className="orders-page-wrapper">
      {userName && <h2 className="page-title">Hello {userName}, here are your orders</h2>}
      {!userName && <h2 className="page-title">Order History</h2>}

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No orders found</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            className="order-history-container"
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              margin: '15px 0',
              borderRadius: '10px',
              backgroundColor: '#fff'
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <div>
              <strong>Items:</strong>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ marginLeft: '10px' }}>
                  <p>{item.name} x {item.quantity} @ ₹{item.price}</p>
                </div>
              ))}
            </div>

            <button
              className="pay-btn"
              onClick={() => navigate('/payment', { state: { order } })}
            >
              Make Payment
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
