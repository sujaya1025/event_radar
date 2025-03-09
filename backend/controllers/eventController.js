const Events = require("../models/Events");

const createEvent = async (req, res) => {
    const { title, description, location, date, registrationLink } = req.body;

    if (!title || !description || !location || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const event = new Events({
            title,
            description,
            location,
            date,
            registrationLink,
            organizer: req.user._id, 
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.error("Error in createEvent:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getEventsByCity = async (req, res) => {
    const { city } = req.params;

    try {
        const events = await Events.find({ location: city })
           .populate("attendees", "name"); 
        if(!events.length) {
            return res.status(404).json({ message: "No events found for this city" });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error("Error in getEventsByCity:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




module.exports = {createEvent,getEventsByCity};
