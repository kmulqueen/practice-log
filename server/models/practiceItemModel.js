module.exports = (sequelize, Sequelize) => {
  const PracticeItem = sequelize.define("practice_item", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exercise: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tempo: {
      type: Sequelize.INTEGER,
    },
    duration: {
      type: Sequelize.STRING,
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    goalId: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
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
  return PracticeItem;
};
