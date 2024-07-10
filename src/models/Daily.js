const mongoose = require('mongoose');

const DailySchema = new mongoose.Schema({
  temperature: Number, 
  humidity: Number,
  date_time: String
},{
  timestamps: true,
})

module.exports = mongoose.model("Daily", DailySchema);