const e = require("cors");
const db = require("../models");
const Goal = db.goals;
const Op = db.Sequelize.Op;

// CREATE
exports.create = async (req, res) => {
  const { name, userId, targetTempo, targetDuration, tags } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Name can not be empty.",
    });
  }

  if (!userId) {
    return res.status(400).json({
      message: "UserId can not be empty.",
    });
  }

  // Check that userID is valid
  const userExists = await db.users.findOne({
    where: { id: parseInt(userId) },
    attributes: ["id"],
  });

  if (userExists === null) {
    return res.status(400).json({
      message: "Invalid userId",
    });
  }
  const newGoal = {
    name,
    userId: parseInt(userId),
    targetTempo,
    targetDuration,
    tags,
  };
  try {
    const goal = await Goal.create(newGoal);
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Server error occurred while creating the goal.",
    });
  }
};

// FIND ALL
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  try {
    const goals = await Goal.findAll({ where: condition });
    if (goals.length) {
      res.status(200).json(goals);
    } else {
      res.status(404).json({
        message: "No goals found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error occurred while retrieving Goals.",
    });
  }
};

// FIND BY ID
exports.findById = async (req, res) => {
  const id = parseInt(req.params.id);
  const goal = await Goal.findOne({ where: { id: id } });
  if (goal === null) {
    res.status(404).json({
      message: "Goal not found!",
    });
  } else {
    res.status(200).json(goal);
  }
};

// FIND ALL GOALS BY USER ID
exports.findUserGoals = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await db.users.findOne({ where: { id: userId } });
  if (user === null) {
    return res.status(404).json({
      message: "User not found.",
    });
  } else {
    try {
      const goals = await Goal.findAll({ where: { userId } });

      if (!goals.length) {
        return res.status(404).json({
          message: "No goals found for user.",
        });
      } else {
        return res.status(200).json(goals);
      }
    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          "Server error occurred while retrieving user's goals.",
      });
    }
  }
};

// Update a Goal by the id in the request
exports.updateById = async (req, res) => {};
// Delete a Goal with the specified id in the request
exports.deleteById = async (req, res) => {};
// Delete all Goals from the database.
exports.deleteAll = async (req, res) => {};
