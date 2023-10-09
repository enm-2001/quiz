const express = require('express')
const { getQuestions, createQuestion, deleteQuestion, getQuestionById, updateQuestion } = require('../controllers/questionsController')
const {authenticateToken} = require('../auth/checkAuth')

const router = express.Router()
router.get('/questions/:categoryId', getQuestions)
router.post('/questions', authenticateToken, createQuestion)
router.delete('/questions/:id', authenticateToken, deleteQuestion)
router.get('/questions/ques/:id', getQuestionById)
router.put('/questions/:id', authenticateToken, updateQuestion)

module.exports = router