import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventForm.css';
import { Input, TextArea, Select, Button } from './Form';

function EventForm() {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    ticketPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:5000/api/events', newEvent);
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create New Event</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          id="title"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          required
        />
        <TextArea
          label="Description"
          id="description"
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Date"
          id="date"
          name="date"
          type="datetime-local"
          value={newEvent.date}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Location"
          id="location"
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Ticket Price"
          id="ticketPrice"
          name="ticketPrice"
          type="number"
          value={newEvent.ticketPrice}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </Button>
      </form>
    </div>
  );
}

export default EventForm;

