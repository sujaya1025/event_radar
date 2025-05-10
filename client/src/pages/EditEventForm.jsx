import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './EditEventForm.css'; // Import the CSS file

const EditEventForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state;

  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    date: event.date.split('T')[0],
    city: event.city,
    address: event.address
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/events/update/${event._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Event updated successfully!');
      navigate('/my-events');
    } catch (err) {
      alert('Update failed');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEventForm;
