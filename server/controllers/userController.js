const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// CREATE
exports.create = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({
      message: "Userame can not be empty!",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Password can not be empty!",
    });
  }

  try {
    const userExists = await User.findOne({ where: { username: username } });
    if (userExists) {
      return res.status(400).json({
        message: "User with that username already exists.",
      });
    } else {
      const newUser = {
        username,
        password,
      };

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      const user = await User.create(newUser);

      if (user) {
        return res.status(201).json({
          id: user.id,
          username: user.username,
          token: generateToken(user.id),
        });
      } else {
        return res.status(400).json({
          message: "Invalid user data.",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message:
        error.message || "Server error occurred while creating the user.",
    });
  }
};

// AUTHENTICATE
exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({
        id: user.id,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({
        message: "Invalid login credentials.",
      });
    }
  } else {
    res.status(404).json({
      message: "User not found.",
    });
  }
};

// FIND ALL
exports.findAll = async (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.iLike]: `%${username}%` } }
    : null;
  try {
    const users = await User.findAll({
      where: condition,
      attributes: ["id", "username", "createdAt", "updatedAt"],
    });
    if (users.length) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({
        message: "No users found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error occurred while retrieving Users.",
    });
  }
};

// FIND BY ID
exports.findById = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findOne({ where: { id: id } });
  if (user === null) {
    res.status(404).json({
      message: "User not found!",
    });
  } else {
    res.status(200).json(user);
  }
};

// Update a User by the id in the request
exports.updateById = async (req, res) => {};
// Delete a User with the specified id in the request
exports.deleteById = async (req, res) => {};
// Delete all Users from the database.
exports.deleteAll = async (req, res) => {};
