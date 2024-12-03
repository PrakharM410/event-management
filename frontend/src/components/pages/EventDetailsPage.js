import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleBookTicket = () => {
    navigate(`/payment/${id}`);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <img src={event.image || 'https://via.placeholder.com/800x400'} alt={event.title} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="mb-4">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.ticketPrice}</p>
        <p><strong>Available Tickets:</strong> {event.capacity - event.registeredAttendees}</p>
      </div>
      <button 
        onClick={handleBookTicket}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={event.registeredAttendees >= event.capacity}
      >
        {event.registeredAttendees >= event.capacity ? 'Sold Out' : 'Book Ticket'}
      </button>
    </div>
  );
}

export default EventDetailsPage;

