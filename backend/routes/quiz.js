const express = require('express')
const {addQuiz, getQuiz, getMarksByCategory, getQuizByDate} = require('../controllers/quizController')
const {authenticateToken} = require('../auth/checkAuth')

const router = express.Router();

router.post('/quiz', authenticateToken, addQuiz)
router.get('/quiz/categories', getQuiz)
router.get('/quiz/marks', getMarksByCategory)
router.get('/quiz/date', getQuizByDate)


module.exports = router