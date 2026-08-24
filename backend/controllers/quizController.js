const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const QuizResult = require('../models/QuizResult');

const getBadge = (correct) => {
  if (correct === 30) return "A'lo";
  if (correct >= 24) return "Yaxshi";
  if (correct >= 15) return "Qoniqarli";
  return "80% dan kam";
};

const getMotivation = (correct) => {
  if (correct === 30) return "Mukammal natija! Siz bu texnologiyani 100% bilasiz! 🏆";
  if (correct >= 24) return "Zo'r natija! Siz bu texnologiyani juda yaxshi bilasiz! 🌟";
  if (correct >= 18) return "Yaxshi natija! Davom eting va yanada rivojlaning! 💪";
  if (correct >= 15) return "Qoniqarli natija. Ko'proq amaliyot qiling! 📚";
  return "Tilni 80% dan kam bilasiz. Ko'proq mashq qiling! 🎯";
};

// Load correct answers from JSON file
const loadAnswersFromFile = (slug) => {
  const filePath = path.join(__dirname, '../data/questions', `${slug}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return (data.questions || []).reduce((acc, q) => {
        acc[q.id] = q.answer;
        return acc;
      }, {});
    } catch (e) {
      console.error(`Error loading answers from ${filePath}:`, e.message);
    }
  }
  return null;
};

// @desc    Submit quiz answers
// @route   POST /api/submit
// @access  Public
const submitQuiz = async (req, res, next) => {
  try {
    const { technology, answers, timeTaken, category } = req.body;
    const slug = String(technology).toLowerCase().replace(/[^a-z0-9]/g, '');

    let correctAnswersMap = {};

    // Try MongoDB first
    if (mongoose.connection.readyState === 1) {
      try {
        const Technology = require('../models/Technology');
        const tech = await Technology.findOne({ slug });
        if (tech && tech.questions && tech.questions.length > 0) {
          tech.questions.forEach(q => { correctAnswersMap[q.id] = q.answer; });
        }
      } catch (e) { /* fallback */ }
    }

    // Fallback to JSON
    if (Object.keys(correctAnswersMap).length === 0) {
      correctAnswersMap = loadAnswersFromFile(slug);
      if (!correctAnswersMap) {
        return res.status(404).json({ success: false, message: `Technology '${technology}' not found` });
      }
    }

    // Normalize answers format
    let normalizedAnswers = [];
    if (Array.isArray(answers)) {
      normalizedAnswers = answers;
    } else if (typeof answers === 'object' && answers !== null) {
      normalizedAnswers = Object.entries(answers).map(([key, val]) => ({
        questionId: parseInt(key, 10) + 1,
        selectedAnswer: typeof val === 'number' ? val : -1
      }));
    }

    // Grade answers
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const gradedAnswers = normalizedAnswers.map(a => {
      const qId = a.questionId;
      const sel = a.selectedAnswer;
      const expected = correctAnswersMap[qId];
      const isCorrect = sel !== -1 && sel === expected;

      if (sel === -1 || sel === undefined) {
        skippedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      return {
        questionId: qId,
        selectedAnswer: sel,
        correctAnswer: expected,
        isCorrect
      };
    });

    const totalQuestions = normalizedAnswers.length || 30;
    const percentage = parseFloat(((correctCount / totalQuestions) * 100).toFixed(1));
    const badge = getBadge(correctCount);
    const motivation = getMotivation(correctCount);

    // Save to MongoDB if connected
    let resultId = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const result = await QuizResult.create({
          technology,
          category: category || 'frontend',
          totalQuestions,
          correctAnswers: correctCount,
          wrongAnswers: wrongCount,
          score: correctCount,
          percentage,
          badge,
          userAnswers: gradedAnswers.map(a => ({
            questionId: a.questionId,
            selectedAnswer: a.selectedAnswer,
            isCorrect: a.isCorrect
          })),
          timeTaken: timeTaken || 0
        });
        resultId = result._id;
      } catch (e) {
        console.error('Failed to save result to DB:', e.message);
      }
    }

    res.json({
      success: true,
      data: {
        id: resultId,
        technology,
        category,
        totalQuestions,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        skippedAnswers: skippedCount,
        score: correctCount,
        percentage,
        badge,
        motivation,
        isPerfect: correctCount === 30,
        gradedAnswers,
        completedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all results
// @route   GET /api/results
// @access  Public
const getResults = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: [], message: 'Database not connected (offline mode)' });
    }
    const results = await QuizResult.find().sort({ completedAt: -1 }).limit(50);
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitQuiz, getResults };
