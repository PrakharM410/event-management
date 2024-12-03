import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import './Payment.css';

function Payment() {
  const [booking, setBooking] = useState(null);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/events/${eve}`);
      console.log(response)
      setBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking:', error);
    }
  };

  const handlePaymentSuccess = async (details, data) => {
    try {
      await axios.post(`http://localhost:5001/api/bookings/${bookingId}/pay`, {
        paymentId: data.orderID,
        paymentDetails: details
      });
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="payment">
      <h2>Payment for {booking.event.name}</h2>
      <p>Quantity: {booking.quantity}</p>
      <p>Total: ${booking.totalAmount}</p>
      <PayPalButton
        amount={booking.totalAmount}
        onSuccess={handlePaymentSuccess}
        options={{
          clientId: AfEseCRDiZiWBSZUiQQ6HexFFRLIqHSLa8fmEtuJDUzvhVzkRYZ3OYRWyLkE3wgeWbF3DCtjl3RupdNy
        }}
      />
    </div>
  );
}

export default Payment;

