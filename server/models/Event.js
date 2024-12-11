const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  startTime: { type: String },
  endDate: { type: Date },
  endTime: { type: String },
  category: { type: String, enum: ['','Work', 'School', 'Family', 'Friend', 'Personal', 'Unclassified'], default: 'Unclassified' },
  partiesInvolved: { type: String, maxlength: 300 },
  dueDate: { type: Date },
  progress: { type: String, enum: ['Not started', 'In progress', 'Completed'], required: true },
  completionLevel: { type: Number, min: 0, max: 99 },
  remark: { type: String, maxlength: 300 },
  important: { type: Boolean, default: false },
});

module.exports = mongoose.model('Event', EventSchema);
