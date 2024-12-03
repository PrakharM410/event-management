import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';

function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
    console.log(bookings);
  }, []);

  const fetchBookings = async () => {
    try {
      console.log("fetching...");
      const response = await axios.get(`http://localhost:5001/api/bookings/${localStorage.getItem('usrId')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <h1>You don't have any bookings yet</h1>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <h3>{booking.eventId.name}</h3>
            <p>Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
            <p>Quantity: {booking.quantity}</p>
            <p>Total Paid: ₹{booking.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserDashboard;
