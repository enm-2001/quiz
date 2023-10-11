const { client } = require("../connection/db");

class Category {
    async getAllCategories() {
        try {
            const query = 'select * from categories';
            const { rows } = await client.query(query);
            return rows;
        } catch (e) {
            console.log(e);
        }

    }

    async createCategory(cname, cdesc, no_of_quiz){
        try {
            const query = 'insert into categories(cname, cdesc, no_of_quiz) values($1, $2, $3) returning *'
            const values = [cname, cdesc, no_of_quiz]
            const {rows} = await client.query(query, values)
            return rows[0];
        } catch (e) {
            console.log(e);
        } 
    }
    async deleteCategory(id){
        try {
            const query = `delete from categories where category_id = ${id}`
            await client.query(query)
            return
        } catch (error) {
            console.log(error);
        }
    }
    async getCategoryById(id){
        try {
            const query = `select * from categories where category_id = ${id}`
            const { rows } = await client.query(query)
            return rows[0]
        } catch (error) {
            console.log(error);
        }
    }
    async updateCategory(category_id, cname, cdesc){
        try {


            const query = `update categories set cname = $1, cdesc = $2 where category_id = ${category_id} returning *`
            const values = [cname, cdesc]
            const {rows} = await client.query(query, values) 
            return rows[0]
        } catch (error) {
            console.log(error);
        }
    }
    async updateQuiz(category_id){
        try {
            const query = `update categories set no_of_quiz = no_of_quiz + 1 where category_id = ${category_id}`
            await client.query(query)
            return
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Category