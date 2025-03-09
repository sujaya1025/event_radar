import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./CreateEvent.css"; 

const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        registrationLink: "",
    });

    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            await axios.post("http://localhost:5000/api/events/create", eventData, {
                headers: { "Content-Type": "application/json" },
            });

            setMessage({ text: "Event created successfully!", type: "success" });
            setEventData({
                title: "",
                description: "",
                location: "",
                date: "",
                registrationLink: "",
            });
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || "Server error",
                type: "danger",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="event-form-container"
        >
            <h2 className="form-title">Create Event</h2>

            {message.text && (
                <motion.p 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`message ${message.type}`}
                >
                    {message.text}
                </motion.p>
            )}

            <motion.form 
                onSubmit={handleSubmit} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="event-form"
            >
                <motion.input
                    type="text" name="title" value={eventData.title} onChange={handleChange}
                    placeholder="Title" required
                    whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
                />
                
                <motion.textarea
                    name="description" value={eventData.description} onChange={handleChange}
                    placeholder="Description" required
                    whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
                />

                <motion.input
                    type="text" name="location" value={eventData.location} onChange={handleChange}
                    placeholder="Location" required
                    whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
                />

                <motion.input
                    type="date" name="date" value={eventData.date} onChange={handleChange} required
                    whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
                />

                <motion.input
                    type="text" name="registrationLink" value={eventData.registrationLink} onChange={handleChange}
                    placeholder="Registration Link"
                    whileFocus={{ scale: 1.05, borderColor: "#007bff" }}
                />

                <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="submit-button"
                >
                    {loading ? "Creating..." : "Create Event"}
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default CreateEvent;
