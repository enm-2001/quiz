const { client } = require("../connection/db");

class Question{
    async getQuestions(id){
        try {
            const query = `select * from questions where category_id = ${id}`
            const { rows } = await client.query(query)
            return rows
            
        } catch (error) {
            console.log(error);
        }
    }

    async createQuestion(question, options, answer, category_id){
        try {
            const query = 'insert into questions(question, options, answer, category_id) values($1, $2, $3, $4) returning *'
            const values = [question, options, answer, category_id]
            const {rows} = await client.query(query, values)
            return rows[0]
        } catch (error) {
            console.log(error);
        }
    }

    async deleteQuestion(id){
        try {
            const query = `delete from questions where question_id = ${id}`
            await client.query(query)
            return
        } catch (error) {
            console.log(error);
        }
    }

    async getQuestionById(id){
        try {
            const query = `select * from questions where question_id = ${id}`
            const {rows} = await client.query(query)
            return rows[0]
        } catch (error) {
            console.log(error);
        }
    }

    async updateQuestion(id, question, options, answer){
        try {
            const query = `update questions set question = $1, answer = $2, options = $3 where question_id = $4`
            const values = [question, answer, options, id]
            await client.query(query, values)
            return
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Question