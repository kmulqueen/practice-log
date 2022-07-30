const db = require("../models");
const Goal = db.goals;
const Op = db.Sequelize.Op;

// CREATE
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  const newGoal = {
    name: req.body.name,
  };
  try {
    const goal = await Goal.create(newGoal);
    res.status(201).send(goal);
  } catch (error) {
    res.status(500).send({
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
      res.status(200).send(goals);
    } else {
      res.status(404).send({
        message: "No goals found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Server error occurred while retrieving Goals.",
    });
  }
};

// FIND BY ID
exports.findById = async (req, res) => {
  const id = parseInt(req.params.id);
  const goal = await Goal.findOne({ where: { id: id } });
  if (goal === null) {
    res.status(404).send({
      message: "Goal not found!",
    });
  } else {
    res.status(200).send(goal);
  }
};

// Update a Goal by the id in the request
exports.updateById = async (req, res) => {};
// Delete a Goal with the specified id in the request
exports.deleteById = async (req, res) => {};
// Delete all Goals from the database.
exports.deleteAll = async (req, res) => {};
