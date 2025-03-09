const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true }, 
    date: { type: Date, required: true },
    registrationLink: { type: String },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    attendeeCount: { type: Number, default: 0 } 
});

module.exports = mongoose.model("Events", eventSchema);
