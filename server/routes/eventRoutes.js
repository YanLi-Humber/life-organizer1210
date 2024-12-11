const express = require('express');
const Event = require('../models/Event');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router(); // Use the router instead of app

// Fetch Events
router.get("/", authenticateToken, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

// Create Event
router.post("/", authenticateToken, async (req, res) => {
  const { title, date } = req.body;
  try {
    const newEvent = new Event({ title, date, userId: req.user.id });
    await newEvent.save();
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
});

// Delete Event
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
});

// Update Event
router.put("/:id", authenticateToken, async (req, res) => {
  const { title } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
});

module.exports = router; // Export the router, not the app
