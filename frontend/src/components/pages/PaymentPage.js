import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaymentPage() {
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${eventId}`);
      setEvent(res.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (event.ticketPrice * quantity).toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const res = await axios.post('http://localhost:5000/api/tickets/book', {
        eventId: event._id,
        quantity: quantity,
        paymentDetails: details,
      }, { withCredentials: true });
      navigate('/payment-success', { state: { bookingDetails: res.data } });
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('There was an error processing your payment. Please try again.');
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment for {event.title}</h1>
      <div className="mb-8">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price per ticket:</strong> ${event.ticketPrice}</p>
      </div>
      <div className="mb-8">
        <label htmlFor="quantity" className="block mb-2">Number of tickets:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max={event.capacity - event.registeredAttendees}
          value={quantity}
          onChange={handleQuantityChange}
          className="w-24 px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-8">
        <p className="text-xl font-bold">Total: ${(event.ticketPrice * quantity).toFixed(2)}</p>
      </div>
      <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
        <PayPalButtons 
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ layout: "horizontal" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PaymentPage;

