import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Cab Booking System</h1>
        <div className="flex flex-col space-y-4">
          <Link to="/addBooking">
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-3">
              Add Booking
            </button>
          </Link>
          <Link to="/allBookings">
            <button className="bg-green-500 hover:bg-green-600 text-white rounded-md p-3">
              See all bookings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
