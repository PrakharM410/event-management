import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './TicketBooking.css';

function TicketBooking() {
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/events/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const handleSubmit = async (e) => {
    console.log("ITs working")
    e.preventDefault();
    const total = event.ticketPrice * quantity
    const userId = localStorage.getItem('usrId')
    try {
      const response = await axios.post('http://localhost:5001/api/bookings', {
        userId,
        eventId,
        quantity,
        totalAmount:total
      });
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="ticket-booking">
      <h2>Book Tickets for {event.name}</h2>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Price: ₹{event.ticketPrice}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="quantity">Number of Tickets:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max={event.capacity - event.registeredAttendees}
            required
          />
        </div>
        <p>Total: ₹{event.ticketPrice * quantity}</p>
        
        <button onClick={handleSubmit}> Proceed to Pay</button>
      </form>
    </div>
  );
}

export default TicketBooking;

