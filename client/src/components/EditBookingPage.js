import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';

function EditBookingPage() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const [email, setUserEmail] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [startTime, setStartTime] = useState('');
    const [cabName, setCabName] = useState('');

    const [cabData, setCabData] = useState([]);


    const fetchCabData = async (id) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cabs/${id}`); // Update the URL with your API endpoint

        const data = await response.json();
        setCabData(data); 
      } catch (error) {
        console.log('Error fetching cabs:', error);
      }
    }

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/bookings/${bookingId}`)
          .then((response) => {
            const data = response.data;
            setCabName(data.cab.name); 
            setUserEmail(data.email);
            setSource(data.source);
            setDestination(data.destination);
            setStartTime(data.startTime);
          })
          .catch((error) => {
            console.log('Error fetching booking', error);
          });
      }, [bookingId]);

    const handleEditBooking = () => {
        const updatedBooking = {
            email,
            source,
            destination,
            startTime,
            cabName,
        };


        axios.put(`${process.env.REACT_APP_API_URL}/bookings/${bookingId}`, updatedBooking, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            setSuccessMessage('Booking updated successfully');
        })
        .catch((error) => {
            setErrorMessage('Error updating booking');
            console.error('Error updating booking', error);
        });

        navigate('/allBookings');

        
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Edit Booking</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-md mb-2 font-medium text-gray-600" htmlFor="userEmail">
                        User Email:
                    </label>
                    <input
                        type="email"
                        id="userEmail"
                        className="w-full p-2 border rounded-md"
                        value={email}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-md mb-2 font-medium text-gray-600" htmlFor="source">
                        Source:
                    </label>
                    <input
                        type="text"
                        id="source"
                        className="w-full p-2 border rounded-md"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-md mb-2 font-medium text-gray-600" htmlFor="destination">
                        Destination:
                    </label>
                    <input
                        type="text"
                        id="destination"
                        className="w-full p-2 border rounded-md"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-md mb-2 font-medium text-gray-600" htmlFor="startTime">
                        Start Time:
                    </label>
                    <input
                        type="time"
                        id="startTime"
                        className="w-full p-2 border rounded-md"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-md mb-2 font-medium text-gray-600" htmlFor="cabName">
                        Cab Name:
                    </label>
                    <input
                        type="text"
                        id="cabName"
                        className="w-full p-2 border rounded-md"
                        value={cabName}
                        onChange={(e) => setCabName(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 text-white rounded p-2 w-full font-semibold"
                    onClick={handleEditBooking}
                >
                    Update Booking
                </button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default EditBookingPage;
