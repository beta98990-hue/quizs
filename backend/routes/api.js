const express = require('express');
const router = express.Router();
const { getTechnologies, getQuestions } = require('../controllers/technologyController');
const { submitQuiz, getResults } = require('../controllers/quizController');
const { validateSubmission } = require('../middleware/validateRequest');

// Technologies
router.get('/technologies', getTechnologies);

// Questions
router.get('/questions/:technology', getQuestions);

// Quiz submission
router.post('/submit', validateSubmission, submitQuiz);

// Results
router.get('/results', getResults);

module.exports = router;
