
const express = require("express");
const { createEvent ,getEventsByCity} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", createEvent); 
router.get("/by-city/:city", getEventsByCity);

module.exports = router;
