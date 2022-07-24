const db = require("../models");
const Instrument = db.instruments;
const Op = db.Sequelize.Op;
// Create and Save a new Instrument
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }
  // Create an instrument
  const instrument = {
    name: req.body.name
  };
  // Save instrument in the database
  Instrument.create(instrument)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the instrument."
      });
    });
};

// Retrieve all Instruments from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Instrument.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Instruments."
        });
      });
};
// Find a single Instrument with an id
exports.findOne = (req, res) => {
  
};
// Update a Instrument by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Instrument with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Instruments from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Instruments
exports.findAllPublished = (req, res) => {
  
};
