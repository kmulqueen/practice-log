const db = require("../models");
const Tag = db.tags;

// CREATE
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      message: "Name can not be empty!",
    });
    return;
  }
  const newTag = {
    name: req.body.name,
    userId: parseInt(req.user.dataValues.id),
  };
  try {
    const tag = await Tag.create(newTag);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error occurred while creating the tag.",
    });
  }
};

// GET USER'S TAGS
exports.getUserTags = async (req, res) => {
  try {
    const userId = parseInt(req.user.dataValues.id);
    // Check if user exists
    const userExists = await db.users.findOne({ where: { id: userId } });
    if (userExists !== null) {
      const tags = await Tag.findAll({ where: { userId } });
      if (!tags.length) {
        return res.status(404).json({ message: "No tags found for user." });
      } else {
        return res.status(200).json(tags);
      }
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Server error occurred while getting user's tags.",
    });
  }
};
