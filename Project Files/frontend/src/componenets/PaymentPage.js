// src/components/PaymentPage.js
import React, { useState } from 'react';
import './PaymentPage.css';
import qrCodeImage from '../assets/QR.jpg';

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const handleReset = () => {
    setOrderPlaced(false);
    setPaymentMethod('qr');
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        {!orderPlaced ? (
          <>
            <h2>Select Payment Method</h2>
            <form onSubmit={handleSubmit}>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                  />
                  QR Code
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  Cash on Delivery
                </label>
              </div>

              {paymentMethod === 'qr' && (
                <div className="qr-section">
                  <img src={qrCodeImage} alt="QR Code" className="qr-image" />
                  <p>Scan the QR code above using any UPI app to make the payment.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <p className="cod-info">You will pay in cash when your order is delivered.</p>
              )}

              <button type="submit" className="submit-btn">Pay Now</button>
            </form>
          </>
        ) : (
          <div className="confirmation-message">
            <div className="animated-checkmark">
              <svg viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark-check" fill="none" d="M14 27l7 7 17-17" />
              </svg>
            </div>
            <h2>Order Placed Successfully</h2>
            <p>
              Payment method: <strong>{paymentMethod === 'qr' ? 'QR Code' : 'Cash on Delivery'}</strong>
            </p>
            <p>Thank you for shopping with us!</p>
            <button className="submit-btn" onClick={handleReset}>Place Another Order</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
