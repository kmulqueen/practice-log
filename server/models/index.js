const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.instruments = require("./instrumentModel.js")(sequelize, Sequelize);
db.goals = require("./goalModel.js")(sequelize, Sequelize);
db.practiceItems = require("./practiceItemModel.js")(sequelize, Sequelize);
db.users = require("./userModel.js")(sequelize, Sequelize);

// Associations
db.goals.hasMany(db.practiceItems);
db.users.hasMany(db.goals);
db.goals.belongsTo(db.users);
db.users.hasMany(db.practiceItems);
db.users.hasMany(db.instruments);
db.instruments.belongsTo(db.users);
db.goals.belongsTo(db.instruments);
module.exports = db;
