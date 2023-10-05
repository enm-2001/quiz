const express = require('express')
const {addQuiz} = require('../controllers/quizController')
const {authenticateToken} = require('../auth/checkAuth')

const router = express.Router();

router.post('/quiz', authenticateToken, addQuiz)

module.exports = router