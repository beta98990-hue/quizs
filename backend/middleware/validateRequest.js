const validateSubmission = (req, res, next) => {
  const { technology, answers } = req.body;

  if (!technology || typeof technology !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Technology name is required and must be a string'
    });
  }

  if (!answers) {
    return res.status(400).json({
      success: false,
      message: 'Answers are required'
    });
  }

  // Handle array format: [{ questionId, selectedAnswer }]
  if (Array.isArray(answers)) {
    if (answers.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Answers array cannot exceed 50 items'
      });
    }

    const isValid = answers.every(a =>
      typeof a === 'object' && a !== null &&
      typeof a.questionId === 'number' &&
      typeof a.selectedAnswer === 'number' &&
      a.selectedAnswer >= -1 && a.selectedAnswer <= 3
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid answer item format'
      });
    }
  } else if (typeof answers !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Answers must be an array or an object map'
    });
  }

  next();
};

module.exports = { validateSubmission };
