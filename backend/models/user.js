const { client } = require("../connection/db");

class User {
  async getAllUsers() {
    const query = "select * from users";
    const { rows } = await client.query(query);
    return rows;
  }

  async getUserByUsername(username) {
    const query = `select * from users where username = '${username}'`;
    const { rows } = await client.query(query);
    return rows;
  }

  async createUser(name, username, email, password, role) {
    const query =
      "insert into users(name, username, email, password, role) values($1, $2, $3, $4, $5) returning *";
    const values = [name, username, email, password, role];
    const { rows } = await client.query(query, values);
    return rows[0];
  }

  async getUserById(id) {
    const query = `select * from users where user_id = ${id}`;
    const { rows } = await client.query(query);
    return rows[0];
  }

  async updateUser(user_id, name, username, email) {
    try {
      const query = `update users set name = $1, username = $2, email = $3 where user_id = $4 returning *`;
      const values = [name, username, email, user_id];
      // console.log("qq",query);
      const { rows } = await client.query(query, values);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id) {
    const query = `delete from users where user_id = ${id}`;
    await client.query(query);
  }

  async uploadAvatar(user_id, buffer) {
    try {
      const query = "update users set avatar = $1 where user_id = $2";
      const value = [buffer, user_id];
      await client.query(query, value);
      return;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
