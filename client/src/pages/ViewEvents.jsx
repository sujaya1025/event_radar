import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './ViewEvents.css';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState('');

  const city = localStorage.getItem('selectedCity');

  useEffect(() => {
    if (!city) {
      setError('City not selected');
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          setError('No token found in localStorage');
          setLoading(false);
          return;
        }

        console.log('Fetching events for city:', city);
        const response = await Axios.get(`http://localhost:5000/api/events/city/${city}`, {
          headers: {
            Authorization:`Bearer ${localStorage.getItem('token')}`,  // Sending token in header
          },
        });

        console.log('Events fetched successfully:', response.data);
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [city]); // Dependency on city so it triggers when city changes

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setRegistrationStatus('No token found. Please log in again.');
        return;
      }

      console.log('Registering for event ID:', eventId);

      const response = await Axios.post(
        `http://localhost:5000/api/events/register/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Registration Response:', response); 
      setRegistrationStatus(response.data.msg); 
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err);
      setRegistrationStatus(
        err.response ? err.response.data.msg : 'Registration failed'
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Events in {city}</h1>
      {events.length === 0 ? (
        <p>No events found for this city.</p>
      ) : (
        <div className="container">
          {events.map((event) => (
            <div className="col-md-4" key={event._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text">
                    <small className="text-muted">Organized by: {event.organizer.name}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Address: {event.address}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Date: {new Date(event.date).toLocaleDateString()}</small>
                  </p>
                  <p>Attendees: {event.attendees.length}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRegister(event._id)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {registrationStatus && (
  <div className="alert alert-info mt-3 text-center">
    {registrationStatus}
  </div>
)}

    </div>
  );
};

export default ViewEvents;
