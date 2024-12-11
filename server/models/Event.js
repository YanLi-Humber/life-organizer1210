const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the user
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);



// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   creator: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   participants: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   category: {
//     type: String,
//     enum: ['personal', 'work', 'holiday', 'other'],
//     default: 'personal'
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Event', eventSchema);
