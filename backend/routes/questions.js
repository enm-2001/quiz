const express = require('express')
const { getQuestions, createQuestion, deleteQuestion } = require('../controllers/questionsController')
const {authenticateToken} = require('../auth/checkAuth')

const router = express.Router()
router.get('/questions/:categoryId', getQuestions)
router.post('/questions', authenticateToken, createQuestion)
router.delete('/questions/:id', authenticateToken, deleteQuestion)

module.exports = router