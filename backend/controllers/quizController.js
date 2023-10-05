const Quiz = require('../models/quiz')
const quiz = new Quiz()

const addQuiz = async (req, res) => {
    try {
        const {category_id, user_id, marks} = req.body
        console.log(category_id);
        const created_at = new Date()
        const result = await quiz.addQuiz(category_id, user_id, marks, created_at)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addQuiz}