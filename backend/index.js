const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes")

require("dotenv").config();
const app = express();
const cors = require("cors");
const { getEventsByCity } = require("./controllers/eventController");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
//app.use("/api/events/by-city",getEventsByCity);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
