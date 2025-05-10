const Event = require('../models/Event');
const User = require('../models/User');

exports.createEvent = async (req, res) => {
  const { title, description, date, city,address } = req.body;
  try {
    const event = await Event.create({
      title,
      description,
      date,
      city,
      address,
      organizer: req.user.id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating event', error: err.message });
  }
};

exports.getEventsByCity = async (req, res) => {
  const { city } = req.params;
  try {
    const events = await Event.find({ city }).populate('organizer', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching events', error: err.message });
  }
};

exports.registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already registered' });
    }

    event.attendees.push(req.user.id);
    await event.save();

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { registeredEvents: eventId }
    });

    res.json({ msg: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Registration error', error: err.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('registeredEvents').populate({
      path: 'registeredEvents',
      populate: { path: 'organizer', select: 'name' }
    });

    const myRegistered = user.registeredEvents;

    const myConducted = await Event.find({ organizer: req.user.id });

    res.json({ registered: myRegistered, conducted: myConducted });
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching my events', error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, city, address } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized to update this event' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.city = city || event.city;
    event.address = address || event.address;

    await event.save();
    res.json({ msg: 'Event updated successfully', event });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating event', error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ msg: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting event', error: err.message });
  }
};

