import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookingForm from './components/BookingForm';
import AllBookings from './components/AllBookings';
import EditBookingPage from './components/EditBookingPage'; 
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/addBooking" element={<BookingForm/>} />
          <Route path="/allBookings" element={<AllBookings/>} />
          <Route path="/edit-booking/:bookingId" element={<EditBookingPage/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
