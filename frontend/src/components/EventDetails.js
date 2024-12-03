import React from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

const events = [
  { id: 1, title: 'Tech Conference 2024', date: 'March 15, 2024', location: 'San Francisco, CA', description: 'A conference for tech enthusiasts.' },
  { id: 2, title: 'Music Festival', date: 'July 4, 2024', location: 'Austin, TX', description: 'A grand music festival with top artists.' },
  { id: 3, title: 'Food & Wine Expo', date: 'September 22, 2024', location: 'New York, NY', description: 'A delightful food and wine experience.' },
];

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find(event => event.id === parseInt(id));

  if (!event) {
    return <div>Event not found!</div>;
  }

  const handlePayment = () => {
    window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XXXXXX";  // Replace with actual PayPal link
  };

  return (
    <div className="event-details container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{event.title}</h1>
      <p className="text-xl text-gray-600 mb-4">{event.date}</p>
      <p className="text-xl text-gray-600 mb-4">{event.location}</p>
      <p className="text-lg text-gray-700 mb-6">{event.description}</p>
      <button onClick={handlePayment} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">Book Now</button>
    </div>
  );
}
