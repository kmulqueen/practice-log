module.exports = (sequelize, Sequelize) => {
  const Instrument = sequelize.define("instrument", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Instrument;
};
