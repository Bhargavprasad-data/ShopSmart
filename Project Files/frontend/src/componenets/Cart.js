import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    const items = cart.map(item => ({
      product: item._id || null,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    const totalPrice = items.reduce((sum, i) => {
      const q = i.quantity || 1;
      return sum + i.price * q;
    }, 0);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      const res = await axios.post('http://localhost:5000/api/orders', {
        items,
        totalPrice,
        userId: user._id,
      });

      if (res.status === 201) {
        alert('Order placed successfully!');
        cart.forEach(item => removeFromCart(item._id));
        navigate('/orders');
      } else {
        alert('Order failed. Try again.');
      }
    } catch (err) {
      console.error('🛑 Full error response:', err);
      alert(`Order failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const totalAmount = cart.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + item.price * quantity;
  }, 0);

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: '#f1f1f1',
        boxSizing: 'border-box',
      }}
    >
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => {
            const quantity = item.quantity || 1;
            return (
              <div
                key={item._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  padding: '15px',
                  margin: '15px 0',
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                }}
              >
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Total: ₹{item.price * quantity}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      padding: '8px 12px',
                      marginTop: '10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </div>
            );
          })}

          {/* ✅ Always-visible Place Order button at the bottom of content */}
          <div
            style={{
              marginTop: '30px',
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '20px',
              paddingBottom: '60px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.05)',
            }}
          >
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
              Total: ₹{totalAmount}
            </p>
            <button
              onClick={handlePlaceOrder}
              style={{
                marginTop: '10px',
                padding: '12px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
