const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend'] },
  totalQuestions: { type: Number, default: 50 },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  badge: { type: String },
  userAnswers: [{ questionId: Number, selectedAnswer: Number, isCorrect: Boolean }],
  timeTaken: { type: Number }, // in seconds
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('QuizResult', quizResultSchema);
