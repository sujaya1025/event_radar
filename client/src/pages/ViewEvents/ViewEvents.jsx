import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./ViewEvents.css"; 

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const city = localStorage.getItem("selectedCity");

  useEffect(() => {
    if (!city) {
      navigate("/city-selection");
    } else {
      fetchEvents();
    }
  }, [city, navigate]);
  console.log("Selected city:", city);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/by-city/${city}`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="events-container d-flex flex-column align-items-center mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-center fw-bold text-light">Events in {city}</h2>

      {loading ? (
        <p className="text-light">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-light">No events available for this city.</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <motion.div 
              key={event._id} 
              className="event-card p-4 shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="fw-bold">{event.title}</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Attendees:</strong></p>
              <ul>
                {event.attendees.length > 0 ? (
                  event.attendees.map((attendee) => (
                    <li key={attendee._id}>{attendee.name}</li>
                  ))
                ) : (
                  <li>No attendees yet</li>
                )}
              </ul>
              {event.registrationLink && (
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Register
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ViewEvents;
