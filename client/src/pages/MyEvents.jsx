import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyEvents.css'; // Import the cleaned-up CSS file

const MyEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [conductedEvents, setConductedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events/mine', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setRegisteredEvents(res.data.registered);
        setConductedEvents(res.data.conducted);
      } catch (err) {
        console.error('Error fetching my events:', err);
      }
    };

    fetchMyEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setConductedEvents(prev => prev.filter(event => event._id !== id)); 
      alert("Event deleted");
    } catch (err) {
      alert("Error deleting event");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="my-events-section">
        <h2>My Registered Events</h2>
        {registeredEvents.length === 0 ? (
          <p>No registered events</p>
        ) : (
          registeredEvents.map(event => (
            <div key={event._id} className="card">
              <h5 className="card-title">{event.title}</h5>
              <p className="card-text">{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
              <p><strong>City:</strong> {event.city}</p>
              <p><strong>Organizer:</strong> {event.organizer?.name}</p>
              <p><strong>Attendees:</strong> {event.attendees.length}</p>
            </div>
          ))
        )}
      </div>

      {/* My Conducted Events */}
      <div className="my-events-section">
        <h2>My Conducted Events</h2>
        {conductedEvents.length === 0 ? (
          <p>No conducted events</p>
        ) : (
          conductedEvents.map(event => (
            <div key={event._id} className="card">
              <h5 className="card-title">{event.title}</h5>
              <p className="card-text">{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
              <p><strong>City:</strong> {event.city}</p>
              <p><strong>Attendees:</strong> {event.attendees.length}</p>
              <button
                onClick={() => navigate(`/edit-event/${event._id}`, { state: event })}
                className="btn btn-warning "
              >
                Edit
              </button>
              
              <button
                onClick={() => handleDelete(event._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyEvents;
