import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventList.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events. Please try again later.');
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/register`);
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register for the event. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading events...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="event-list">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <p className="mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p className="mb-1"><strong>Location:</strong> {event.location}</p>
            <p className="mb-1"><strong>Capacity:</strong> {event.capacity}</p>
            <p className="mb-4"><strong>Registered:</strong> {event.registeredAttendees}</p>
            <button 
              onClick={() => handleRegister(event._id)}
              disabled={event.registeredAttendees >= event.capacity}
              className={`w-full py-2 px-4 rounded ${
                event.registeredAttendees >= event.capacity
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {event.registeredAttendees >= event.capacity ? 'Event Full' : 'Register'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;

