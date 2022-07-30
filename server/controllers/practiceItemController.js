const db = require("../models");
const PracticeItem = db.practiceItems;
const Op = db.Sequelize.Op;

// CREATE
exports.create = async (req, res) => {
  const { exercise, goalId } = req.body;
  if (!exercise) {
    res.status(400).send({
      message: "Exercise can not be empty!",
    });
    return;
  }

  if (!goalId) {
    res.status(400).send({
      message: "GoalId can not be empty!",
    });
    return;
  }

  // Check if goalId is valid
  const goal = await db.goals.findOne({ where: { id: goalId } });
  if (goal === null) {
    res.status(400).send({
      message: "GoalId not found!",
    });
    return;
  }
  const newPracticeItem = {
    exercise: exercise,
    goalId: goalId,
  };

  try {
    const practiceItem = await PracticeItem.create(newPracticeItem);
    res.status(201).send(practiceItem);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error occurred while trying to create practice item",
    });
  }
};

// FIND ALL
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  try {
    const practiceItems = await PracticeItem.findAll({ where: condition });
    if (practiceItems.length) {
      res.status(200).send(practiceItems);
    } else {
      res.status(404).send({
        message: "No practice items found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Server error occured while retrieving practice items.",
    });
  }
};

// FIND BY ID
exports.findById = async (req, res) => {
  const id = parseInt(req.params.id);
  const practiceItem = await PracticeItem.findOne({
    where: { id: id },
  });
  if (practiceItem === null) {
    res.status(404).send({
      message: "Practice item not found!",
    });
  } else {
    res.status(200).send(practiceItem);
  }
};
// Update a PracticeItem by the id in the request
exports.updateById = async (req, res) => {};
// Delete a PracticeItem with the specified id in the request
exports.deleteById = async (req, res) => {};
// Delete all PracticeItems from the database.
exports.deleteAll = async (req, res) => {};
