const db = require("../models");
const Tag = db.tags;

// CREATE
exports.create = async (req, res) => {
  const userId = parseInt(req.user.dataValues.id);
  if (!req.body.name) {
    res.status(400).json({
      message: "Name can not be empty!",
    });
    return;
  }
  const newTag = {
    name: req.body.name,
    userId,
  };
  try {
    // Check if tag already exists for user
    const userTags = await Tag.findAll({ where: { userId } });
    let tagExists = false;
    if (userTags.length) {
      userTags.forEach((tag) => {
        if (
          tag.name.toLowerCase().trim() === req.body.name.toLowerCase().trim()
        ) {
          tagExists = true;
        }
      });
    }
    if (!tagExists) {
      const tag = await Tag.create(newTag);
      return res.status(201).json(tag);
    } else {
      return res.status(400).json({ message: "Tag already exists for user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error occurred while creating the tag.",
    });
  }
};

// GET USER'S TAGS
exports.getUserTags = async (req, res) => {
  const userId = parseInt(req.user.dataValues.id);
  try {
    // Check if user exists
    const userExists = await db.users.findOne({ where: { id: userId } });
    if (userExists !== null) {
      const tags = await Tag.findAll({ where: { userId } });
      return res.status(200).json(tags);
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

exports.deleteAll = async (req, res) => {
  const userId = parseInt(req.user.dataValues.id);
  try {
    await Tag.destroy({ where: { userId } });
    res.status(200).json({ message: "User's tags deleted." });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Server error occurred while deleting user's tags.",
    });
  }
};
