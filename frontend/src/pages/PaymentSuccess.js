import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentSuccess.css';

function PaymentSuccess() {
  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase. Your ticket has been confirmed and sent to your registered email address.</p>
      <p>You can view your ticket details in your user dashboard.</p>
      <Link to="/dashboard" className="dashboard-link">Go to Dashboard</Link>
    </div>
  );
}

export default PaymentSuccess;

