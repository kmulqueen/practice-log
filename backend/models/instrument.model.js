module.exports = (sequelize, Sequelize) => {
    const Instrument = sequelize.define("instrument", {
      name: {
        type: Sequelize.STRING
      }
    });
    return Instrument;
  };