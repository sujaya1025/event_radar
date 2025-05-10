// src/pages/CreateEvent.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateEvent.css';

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    console.log("Token:", token); 
  
    if (!token) {
      setError("No token found. Please log in first.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/create",
        { title, description, date, city,address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Create event error:", err.response?.data || err.message);
      setError("Event creation failed. Please try again.");
    }
  };
  
  return (
    <div className="container" >
      <div className="form-page">
      <h2>Create Event</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Event Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            id="city"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
           type="text"
           id="Address"
           className="form-control"
           value={address}
           onChange={(e) => setAddress(e.target.value)}
           required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Create Event</button>
      </form>
      </div>
    </div>
  );
};

export default CreateEvent;
