module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tag", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },
  });
  return Tag;
};
