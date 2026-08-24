const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Load questions from JSON file (fallback)
const loadQuestionsFromFile = (slug) => {
  const filePath = path.join(__dirname, '../data/questions', `${slug}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
};

// Technology metadata
const technologyMeta = require('../data/technologies.json');

// @desc    Get all technologies
// @route   GET /api/technologies
// @access  Public
const getTechnologies = async (req, res, next) => {
  try {
    const { category } = req.query;
    let technologies = technologyMeta;
    if (category) {
      technologies = technologies.filter(t => t.category === category);
    }
    res.json({ success: true, count: technologies.length, data: technologies });
  } catch (error) {
    next(error);
  }
};

// @desc    Get questions by technology
// @route   GET /api/questions/:technology
// @access  Public
const getQuestions = async (req, res, next) => {
  try {
    const { technology } = req.params;
    const slug = technology.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Try MongoDB first
    if (mongoose.connection.readyState === 1) {
      const Technology = require('../models/Technology');
      const tech = await Technology.findOne({ slug });
      if (tech && tech.questions.length > 0) {
        const questions = tech.questions.map(q => ({
          id: q.id,
          level: q.level,
          question: q.question,
          options: q.options
          // Note: answer not sent to client
        }));
        return res.json({ success: true, technology: tech.name, count: questions.length, data: questions });
      }
    }

    // Fallback to JSON file
    const data = loadQuestionsFromFile(slug);
    if (!data) {
      return res.status(404).json({ success: false, message: `Technology '${technology}' not found` });
    }

    // Send questions without answers
    const questions = data.questions.map(q => ({
      id: q.id,
      level: q.level,
      question: q.question,
      options: q.options
    }));

    res.json({ success: true, technology: data.technology, count: questions.length, data: questions });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTechnologies, getQuestions };
