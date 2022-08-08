module.exports = (sequelize, Sequelize) => {
  const Goal = sequelize.define("goal", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateCompleted: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    targetTempo: {
      type: Sequelize.INTEGER,
    },
    totalDuration: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    targetDuration: {
      type: Sequelize.STRING,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    userId: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },
    instrumentId: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },
  });
  return Goal;
};
