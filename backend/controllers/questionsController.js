const Question = require('../models/questions')
const Category = require('../models/category')
const ques = new Question()
const cat = new Category()

const getQuestions = async (req, res) => {
    try {
        const { categoryId } = req.params
        // console.log("catt", categoryId);
        let questions = await ques.getQuestions(categoryId)
        let {cname} = await cat.getCategoryById(categoryId)
        // questions = [...questions, {cname}]
        // console.log(questions);
        res.status(200).json({questions, cname});
    } catch (error) {
        console.error('Error fetching questions', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createQuestion = async (req, res) => {
    try {
        const { question, options, answer, category_id } = req.body.question
        // console.log(question);
        const createdQuestion = await ques.createQuestion(question, options, answer, category_id)
        res.status(200).json(createdQuestion)
    } catch (error) {
        console.error('Error creating question', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const {id} = req.params
        await ques.deleteQuestion(id)
        res.status(200).json({message: "Question deleted"})
    } catch (error) {
        console.error('Error deleting question', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getQuestionById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await ques.getQuestionById(id)
        // console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.error('Error getting question', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateQuestion = async (req, res) => {
    try {
        const {id} = req.params
        const {question, answer, options} = req.body
        await ques.updateQuestion(id, question, options, answer)
        res.status(204).json({message: "Question updated"})
    } catch (error) {
        console.error('Error updating question', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {getQuestions, createQuestion, deleteQuestion, getQuestionById, updateQuestion}