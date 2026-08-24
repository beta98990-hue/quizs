const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  level: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true, validate: v => v.length === 4 },
  answer: { type: Number, required: true, min: 0, max: 3 }
});

const technologySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend'], required: true },
  description: { type: String },
  icon: { type: String },
  color: { type: String },
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Technology', technologySchema);
