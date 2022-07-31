const db = require("../models");
const Instrument = db.instruments;
const Op = db.Sequelize.Op;

// CREATE
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      message: "Name can not be empty!",
    });
    return;
  }
  const newInstrument = {
    name: req.body.name,
  };
  try {
    const instrument = await Instrument.create(newInstrument);
    res.status(201).json(instrument);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Server error occurred while creating the instrument.",
    });
  }
};

// FIND ALL
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  try {
    const instruments = await Instrument.findAll({ where: condition });
    if (instruments.length) {
      res.status(200).json(instruments);
    } else {
      res.status(404).json({
        message: "No instruments found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Server error occurred while retrieving Instruments.",
    });
  }
};

// Find a single Instrument with an id
exports.findById = async (req, res) => {
  const id = parseInt(req.params.id);
  const instrument = await Instrument.findOne({ where: { id: id } });
  if (instrument === null) {
    res.status(404).json({
      message: "Instrument ID not found.",
    });
  } else {
    res.status(200).json(instrument);
  }
};
// Update a Instrument by the id in the request
exports.updateById = async (req, res) => {};
// Delete a Instrument with the specified id in the request
exports.deleteById = async (req, res) => {};
// Delete all Instruments from the database.
exports.deleteAll = async (req, res) => {};
