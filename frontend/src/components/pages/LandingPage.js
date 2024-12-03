import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Event Management</h1>
        <p className="text-xl mb-8">Discover, create, and manage amazing events!</p>
        <div className="space-x-4">
          <Link to="/register?role=attendee" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600">
            I am an Attendee
          </Link>
          <Link to="/register?role=organizer" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
            I am an Organizer
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Featured Events</h2>
        {/* Add EventCard components here */}
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p>Our platform is designed with simplicity in mind.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p>We use industry-standard security measures to protect your transactions.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p>Our team is always here to help you with any questions or issues.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

