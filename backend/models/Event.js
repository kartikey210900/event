// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  attendees: { type: Number, default: 0 },
});

module.exports = mongoose.model("Event", eventSchema);
