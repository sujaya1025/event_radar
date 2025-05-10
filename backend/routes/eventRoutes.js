const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createEvent,
  getEventsByCity,
  registerForEvent,
  getMyEvents,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.post('/create', auth, createEvent);
router.get('/city/:city',auth, getEventsByCity);
router.post('/register/:eventId', auth, registerForEvent);
router.get('/mine', auth, getMyEvents);
router.put('/update/:id', auth, updateEvent);
router.delete('/delete/:id', auth, deleteEvent);
module.exports = router;
