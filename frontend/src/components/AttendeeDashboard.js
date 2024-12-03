import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

function AttendeeDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await axios.get('http://localhost:5000/api/events/upcoming');
        setUpcomingEvents(eventsRes.data);

        const ticketsRes = await axios.get('http://localhost:5000/api/tickets/user', { withCredentials: true });
        setBookedTickets(ticketsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Attendee Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Booked Tickets</h2>
        <div className="space-y-4">
          {bookedTickets.map(ticket => (
            <div key={ticket._id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold">{ticket.event.title}</h3>
              <p>Date: {new Date(ticket.event.date).toLocaleDateString()}</p>
              <p>Location: {ticket.event.location}</p>
              <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AttendeeDashboard;

