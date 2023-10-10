const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../auth/generateToken");
const fs = require("fs");

const user = new User();

const uploadAvatar = async (req, res) => {
  try {
    // console.log("req bodyyyy",req.body);
    const { user_id } = req.params;
    const file = req.file;
    // console.log(req.file);
    const buffer = fs.readFileSync(file.path);
    await user.uploadAvatar(user_id, buffer);
    res.status(200).json({ message: "avatar uploaded" });
  } catch (error) {
    console.log("errr", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  try {
    const users = await user.getUserByUsername(username);
    if (users.length == 0) {
      const hashPwd = await bcrypt.hash(password, 10);
      const result = await user.createUser(
        name,
        username,
        email,
        hashPwd,
        role
      );

      const token = await generateAccessToken(result);
      const newUser = result;
      res.status(201).json({ newUser, token });
    } else {
      res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await user.getUserByUsername(username);
    if (users.length == 0) {
      res.status(409).json({ message: "User does not exist" });
    } else {
      const pwdCorrect = await bcrypt.compare(password, users[0].password);
      if (pwdCorrect) {
        delete users[0].avatar
        // console.log(users);
        const token = await generateAccessToken(users[0]);
        const user = users[0];
        res.status(201).json({ user, token });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    }
  } catch (error) {
    console.error("Error in login user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.user_id;
  try {
    const users = await user.getUserById(id);
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { name, username, email } = req.body;
  // console.log("iiii",id);
  console.log(req.body);

  try {
    const result = await user.updateUser(user_id, name, username, email);
    res.status(204).send({ message: "Updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await user.getUserById(id);

  if (!result) {
    return res.send("User not found");
  }
  try {
    await user.deleteUser(id);
    res.status(200).json({ message: "User removed" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  uploadAvatar,
};
