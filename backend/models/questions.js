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
}

module.exports = Question