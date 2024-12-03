// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Your Dashboard</h1>
      <Link to="/events">View Upcoming Events</Link>
    </div>
  );
};

export default Home;
