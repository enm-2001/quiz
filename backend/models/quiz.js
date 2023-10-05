const { client } = require('../connection/db')

class Quiz{
    async addQuiz(category_id, user_id, marks, created_at){
        try {
            const query = `insert into quiz (category_id, user_id, marks, created_at) values($1, $2, $3, $4) returning *`
            const values = [category_id, user_id, marks, created_at]

            const {rows} = await client.query(query, values)
            return rows[0]
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Quiz