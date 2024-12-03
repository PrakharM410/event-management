import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function PaymentSuccessPage() {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="mb-4">We couldn't find your booking details.</p>
        <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Payment Successful!</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Booking Confirmation</h2>
        <p><strong>Event:</strong> {bookingDetails.event.title}</p>
        <p><strong>Date:</strong> {new Date(bookingDetails.event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {bookingDetails.event.location}</p>
        <p><strong>Quantity:</strong> {bookingDetails.quantity}</p>
        <p><strong>Total Paid:</strong> ${bookingDetails.totalAmount.toFixed(2)}</p>
        <div className="mt-6">
          <button 
            onClick={() => window.print()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Print Ticket
          </button>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;

