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
    },
    targetTempo: {
      type: Sequelize.INTEGER,
    },
    totalDuration: {
      type: Sequelize.STRING,
    },
    targetDuration: {
      type: Sequelize.STRING,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  });
  return Goal;
};
