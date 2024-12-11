const Event = require('../models/Event');

const eventController = {
  // Create new event
  createEvent: async (req, res) => {
    try {
      const event = new Event({
        ...req.body,
        creator: req.userId // From auth middleware
      });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all events for a user
  getUserEvents: async (req, res) => {
    try {
      const events = await Event.find({ creator: req.userId })
        .sort({ date: 'asc' });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single event
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update event
  updateEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if user is the creator
      if (event.creator.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized to update this event' });
      }

      Object.assign(event, req.body);
      await event.save();
      res.json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete event
  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Check if user is the creator
      if (event.creator.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized to delete this event' });
      }

      await event.remove();
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = eventController;