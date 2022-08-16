const db = require("../models");
const PracticeItem = db.practiceItems;
const Op = db.Sequelize.Op;

// CREATE
exports.create = async (req, res) => {
  const { exercise, goalId, instrumentId, tempo, duration, tags, description } =
    req.body;
  const userId = parseInt(req.user.dataValues.id);
  if (!exercise) {
    return res.status(400).json({
      message: "Exercise can not be empty.",
    });
  }

  if (!goalId) {
    return res.status(400).json({
      message: "GoalId can not be empty.",
    });
  }

  if (!instrumentId) {
    return res.status(400).json({
      message: "InstrumentId can not be empty.",
    });
  }

  // Check if goalId is valid
  const goal = await db.goals.findOne({ where: { id: goalId, userId } });
  if (goal === null) {
    return res.status(400).json({
      message: "Invalid goalId.",
    });
  }

  // Check if instrumentId is valid
  const instrument = await db.instruments.findOne({
    where: { id: instrumentId, userId },
  });
  if (instrument === null) {
    return res.status(400).json({
      message: "Invalid instrumentId.",
    });
  }

  const newPracticeItem = {
    exercise,
    goalId,
    userId,
    instrumentId,
    tempo,
    duration,
    tags,
    description,
  };

  try {
    const practiceItem = await PracticeItem.create(newPracticeItem);
    res.status(201).json(practiceItem);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Error occurred while trying to create practice item",
    });
  }
};

// FIND ALL
exports.findAll = async (req, res) => {
  const acceptedQueryParams = ["exercise", "tags", "tempo", "duration", "date"];
  const sentQueryParams = Object.keys(req.query);
  let condition = {};

  sentQueryParams.forEach((param) => {
    // Remove any invalid query params
    if (!acceptedQueryParams.includes(param)) {
      delete req.query[param];
    } else {
      // Format condition based on dataType of param
      if (param === "tags") {
        condition[param] = { [Op.contains]: [req.query[param]] };
      } else if (param === "tempo") {
        condition[param] = { [Op.eq]: parseInt(req.query[param]) };
      } else if (param === "date") {
        condition["createdAt"] = {
          [Op.gte]: new Date(req.query[param]),
        };
      } else {
        condition[param] = { [Op.iLike]: `%${req.query[param]}%` };
      }
    }
  });

  try {
    const practiceItems = await PracticeItem.findAll({ where: condition });
    if (practiceItems.length) {
      res.status(200).json(practiceItems);
    } else {
      res.status(404).json({
        message: "No practice items found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Server error occured while retrieving practice items.",
    });
  }
};

// FIND USER'S PRACTICE ITEMS
exports.findUserPracticeItems = async (req, res) => {
  const acceptedQueryParams = ["exercise", "tags", "tempo", "duration", "date"];
  const sentQueryParams = Object.keys(req.query);
  let condition = {};

  sentQueryParams.forEach((param) => {
    // Remove any invalid query params
    if (!acceptedQueryParams.includes(param)) {
      delete req.query[param];
    } else {
      // Format condition based on dataType of param
      if (param === "tags") {
        condition[param] = { [Op.contains]: [req.query[param]] };
      } else if (param === "tempo") {
        condition[param] = { [Op.eq]: parseInt(req.query[param]) };
      } else if (param === "date") {
        condition["createdAt"] = {
          [Op.gte]: new Date(req.query[param]),
        };
      } else {
        condition[param] = { [Op.iLike]: `%${req.query[param]}%` };
      }
    }
  });

  try {
    const userId = parseInt(req.user.dataValues.id);
    const practiceItems = await PracticeItem.findAll({
      where: condition,
      userId,
    });
    if (practiceItems.length) {
      res.status(200).json(practiceItems);
    } else {
      res.status(404).json({
        message: "No practice items found for user.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Server error occured while retrieving user's practice items.",
    });
  }
};

// FIND BY ID
exports.findById = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.user.dataValues.id);
  const practiceItem = await PracticeItem.findOne({
    where: { id, userId },
  });
  if (practiceItem === null) {
    res.status(404).json({
      message: "Practice item not found!",
    });
  } else {
    res.status(200).json(practiceItem);
  }
};
// Update a PracticeItem by the id in the request
exports.updateById = async (req, res) => {};
// Delete a PracticeItem with the specified id in the request
exports.deleteById = async (req, res) => {};
// Delete all PracticeItems from the database.
exports.deleteAll = async (req, res) => {};
