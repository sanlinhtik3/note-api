const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter your title."],
  },
  description: {
    type: String,
    required: [true, "Please enter your Description."],
  },
}, {timestamps: true});

module.exports = mongoose.model('Note', noteSchema)