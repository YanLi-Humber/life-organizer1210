const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, startDate, startTime, endDate, endTime, category, partiesInvolved, dueDate, progress, completionLevel, remark, important } = req.body;

  try {
      // Log the incoming request body and user for debugging
      console.log('Request Body:', req.body);
      console.log('User ID:', req.user);


        // Validate required fields
        if (!name || !startDate) {
            return res.status(400).json({ message: 'Name and start date are required.' });
        }

        // Ensure end date is after start date if provided
        // if (endDate && new Date(endDate) < new Date(startDate)) {
        //     return res.status(400).json({ message: 'End date cannot be earlier than start date.' });
        // }


        //new set 1
        const startDateUTC = new Date(startDate);
        const endDateUTC = endDate ? new Date(endDate) : null;
        // Ensure end date is after start date if provided
        if (endDateUTC && endDateUTC < startDateUTC) {
            return res.status(400).json({ message: 'End date cannot be earlier than start date.' });
        }


        //new set 2, try if set 1 not work
        // const startDateTime = new Date(startDate);
        // const endDateTime = endDate ? new Date(endDate) : null;

        // // Ensure end date is after start date
        // if (endDateTime && endDateTime < startDateTime) {
        //     return res.status(400).json({ message: 'End date cannot be earlier than start date.' });
        // }
        

        // Ensure completionLevel is valid if progress is "In progress"
        if (progress === 'In progress' && (completionLevel < 0 || completionLevel > 99)) {
            return res.status(400).json({ message: 'Completion level must be between 0 and 99.' });
        }

        // Check for overlapping events
        // const overlappingEvent = await Event.findOne({
        //     user: req.user.id,
        //     $or: [
        //         // Case 1: New event starts during an existing event
        //         {
        //             startDate: { $lte: new Date(endDate || startDate) },
        //             endDate: { $gte: new Date(startDate) },
        //         },
        //         // Case 2: New event has no end date but overlaps with an existing event
        //         {
        //             startDate: { $lte: new Date(startDate) },
        //             endDate: { $exists: false },
        //         },
        //     ],
        // });

        // if (overlappingEvent) {
        //     return res.status(400).json({ message: 'Event overlaps with an existing event.' });
        // }

        // Create a new event (set 1)
        const newEvent = new Event({
            //userId: req.user._id,
            user: req.user.id,
            name,
            startDate: startDateUTC,
            startTime,
            endDate: endDateUTC,
            endTime,
            category,
            partiesInvolved,
            dueDate: dueDate ? new Date(dueDate) : null,
            progress,
            completionLevel: progress === 'In progress' ? completionLevel : null,
            remark,
            important,
        });

    
            // Create a new event (set 2)
            // const newEvent = new Event({
            //     user: req.user.id,
            //     name,
            //     startDate: startDateTime,
            //     startTime,
            //     endDate: endDateTime,
            //     endTime,
            //     category,
            //     partiesInvolved,
            //     dueDate: dueDate ? new Date(dueDate) : null,
            //     progress,
            //     completionLevel: progress === 'In progress' ? completionLevel : null,
            //     remark,
            //     important,
            // });
            
        // Save the event
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getEvents = async (req, res) => {
    const { start, end } = req.query; // Match frontend's query parameter names

    try {
        const query = { user: req.user.id };

        // Apply date filters
        if (start && end) {
            query.startDate = {
                $gte: new Date(start),
                $lte: new Date(end),
            };
        }

        // Fetch and sort events
        const events = await Event.find(query).sort({ startDate: 1 });
        res.status(200).json(events);
    } catch (err) {
        console.error('Error fetching events:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.searchEvents = async (req, res) => {
    const {
        name,
        startDate,
        endDate,
        category,
        important,
        progress,
        dueDate,
    } = req.body; // Match frontend's request body structure

    try {
        const query = { user: req.user.id };

        // Search by name
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        // Filter by date range
        if (startDate && endDate) {
            query.startDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by importance
        if (important !== undefined) {
            query.important = important; // Assume `important` is a boolean
        }

        // Filter by progress
        if (progress) {
            query.progress = progress;
        }

        // Filter by due date
        if (dueDate) {
            query.dueDate = new Date(dueDate);
        }

        // Fetch and sort events
        const events = await Event.find(query).sort({ startDate: 1 });
        res.status(200).json(events);
    } catch (err) {
        console.error('Error searching events:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



// exports.getEvents = async (req, res) => {
//     const { startDate, endDate } = req.query;

//     try {
//         const query = { user: req.user.id };

//         // Filter events based on date range
//         if (startDate && endDate) {
//             query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
//         }

//         // Fetch and sort events
//         const events = await Event.find(query).sort({ startDate: 1 });
//         res.status(200).json(events);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

// exports.searchEvents = async (req, res) => {
//     const {
//         name,
//         periodStart,
//         periodEnd,
//         category,
//         partiesInvolved,
//         important,
//         progress,
//         dueStatus,
//         withRemarks,
//     } = req.query;

//     try {
//         const query = { user: req.user.id };

//         // Search by name (case-insensitive partial match)
//         if (name) {
//             query.name = { $regex: name, $options: 'i' };
//         }

//         // Search by date range
//         if (periodStart && periodEnd) {
//             query.startDate = { $gte: new Date(periodStart), $lte: new Date(periodEnd) };
//         }

//         // Filter by category
//         if (category) {
//             query.category = category;
//         }

//         // Check for parties involved
//         if (partiesInvolved === 'true') {
//             query.partiesInvolved = { $ne: null };
//         }

//         // Filter by importance
//         if (important === 'true') {
//             // query.important = true;
//             query.important = important === 'true';
//         }

//         // Filter by progress
//         if (progress) {
//             query.progress = progress;
//         }

//         // Filter by due status
//         if (dueStatus) {
//             const today = new Date().toISOString().split('T')[0];
//             if (dueStatus === 'overdue') {
//                 query.dueDate = { $lt: today };
//             } else if (dueStatus === 'dueToday') {
//                 query.dueDate = today;
//             } else if (dueStatus === 'notDue') {
//                 query.dueDate = { $gt: today };
//             } else if (dueStatus === 'noDueDate') {
//                 query.dueDate = null;
//             }
//         }

//         // Check for remarks
//         if (withRemarks === 'true') {
//             query.remark = { $ne: null };
//         }

//         // Fetch and sort events
//         const events = await Event.find(query).sort({ startDate: 1 });
//         res.status(200).json(events);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findOne({ _id: id, user: req.user.id });
        if (!event) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error('Error fetching event:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Update an event
exports.updateEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findOneAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Delete an event
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findOneAndDelete({ _id: id, user: req.user.id });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

//************** */

// const Event = require('../models/Event');

// exports.createEvent = async (req, res) => {
//   try {
//     const { name, startDate, startTime, endDate, endTime, category, partiesInvolved, dueDate, progress, completionLevel, remark, important } = req.body;

//     // Check for overlapping events
//     const overlappingEvent = await Event.findOne({
//       user: req.user._id,
//       startDate: { $lte: new Date(endDate || startDate) },
//       endDate: { $gte: new Date(startDate) },
//     });

//     if (overlappingEvent) {
//       return res.status(400).json({ message: 'Event overlaps with an existing event' });
//     }

//     // Create a new event if no overlap
//     const newEvent = new Event({
//       user: req.user._id,
//       name,
//       startDate,
//       startTime,
//       endDate,
//       endTime,
//       category,
//       partiesInvolved,
//       dueDate,
//       progress,
//       completionLevel: progress === 'In progress' ? completionLevel : null,
//       remark,
//       important,
//     });

//     // Save the event
//     await newEvent.save();
//     res.status(201).json({ message: 'Event created successfully', event: newEvent });

//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// exports.getEvents = async (req, res) => {
//   const { startDate, endDate } = req.query;
  
//   try {
//     const query = { user: req.user._id };
//     if (startDate && endDate) {
//       query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }

//     const events = await Event.find(query).sort({ startDate: 1 });
//     res.status(200).json(events);

//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };


// exports.searchEvents = async (req, res) => {
//     const { name, periodStart, periodEnd, category, partiesInvolved, important, progress, dueStatus, withRemarks } = req.query;
  
//     try {
//       const query = { user: req.user._id };
  
//       if (name) {
//         query.name = { $regex: name, $options: 'i' }; // Case-insensitive partial match
//       }
  
//       if (periodStart && periodEnd) {
//         query.startDate = { $gte: new Date(periodStart), $lte: new Date(periodEnd) };
//       }
  
//       if (category) {
//         query.category = category;
//       }
  
//       if (partiesInvolved === 'true') {
//         query.partiesInvolved = { $ne: null };
//       }
  
//       if (important === 'true') {
//         query.important = true;
//       }
  
//       if (progress) {
//         query.progress = progress;
//       }
  
//       if (dueStatus) {
//         const today = new Date().toISOString().split('T')[0];
//         if (dueStatus === 'overdue') {
//           query.dueDate = { $lt: today };
//         } else if (dueStatus === 'dueToday') {
//           query.dueDate = today;
//         } else if (dueStatus === 'notDue') {
//           query.dueDate = { $gt: today };
//         } else if (dueStatus === 'noDueDate') {
//           query.dueDate = null;
//         }
//       }
  
//       if (withRemarks === 'true') {
//         query.remark = { $ne: null };
//       }
  
//       const events = await Event.find(query).sort({ startDate: 1 });
//       res.status(200).json(events);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error', error: err.message });
//     }
//   };
  

//************* */ before "Add logic to check overlapping events:"
// const Event = require('../models/Event');

// exports.createEvent = async (req, res) => {
//   try {
//     const { name, startDate, startTime, endDate, endTime, category, partiesInvolved, dueDate, progress, completionLevel, remark, important } = req.body;
//     const newEvent = new Event({
//       user: req.user._id,
//       name,
//       startDate,
//       startTime,
//       endDate,
//       endTime,
//       category,
//       partiesInvolved,
//       dueDate,
//       progress,
//       completionLevel: progress === 'In progress' ? completionLevel : null,
//       remark,
//       important,
//     });

//     await newEvent.save();
//     res.status(201).json({ message: 'Event created successfully', event: newEvent });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// exports.getEvents = async (req, res) => {
//     const { startDate, endDate } = req.query;
  
//     try {
//       const query = { user: req.user._id };
//       if (startDate && endDate) {
//         query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
//       }
  
//       const events = await Event.find(query).sort({ startDate: 1 });
//       res.status(200).json(events);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error', error: err.message });
//     }
//   };
  

//************* */