const express = require('express');
const {getAllCategories, createCategory, deleteCategory, getCategoryById, updateCategory, updateQuiz} = require('../controllers/categoryController')
const {authenticateToken} = require('../auth/checkAuth')

const router = express.Router();

router.get('/categories', getAllCategories)
router.post('/categories', authenticateToken, createCategory)
router.delete('/categories/:category_id', authenticateToken, deleteCategory)
router.get('/categories/:category_id', getCategoryById)
router.put('/categories/:category_id', authenticateToken, updateCategory)
router.put('/categories/quiz/:category_id', authenticateToken, updateQuiz)

module.exports = router