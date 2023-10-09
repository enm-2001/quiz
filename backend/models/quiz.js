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

    async getQuiz(){
        try {
            // console.log("hiii");
            const query = `select count(*), categories.cname from quiz join categories on quiz.category_id = categories.category_id group by quiz.category_id, categories.cname`
            const {rows} = await client.query(query)
            return rows
        } catch (error) {
            console.log(error);
        }
    }

    async getMarksByCategory(){
        try {
            const query = `select avg(marks) as marks, c.cname from quiz join categories c on quiz.category_id = c.category_id group by quiz.category_id, c.cname`
            const {rows} = await client.query(query)
            return rows
        } catch (error) {
            console.log(error);
        }
    }

    async getQuizByDate(){
        try {
            const query = 'select count(*), created_at as date from quiz group by created_at order by date'
            const {rows} = await client.query(query)
            // console.log("rows:::",rows);
            const formattedRows = rows.map((row) => ({
                count: row.count,
                date: row.date ? row.date.toISOString().split('T')[0] : null, 
              }))
            // console.log(formattedRows);
              return formattedRows;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = Quiz