const express = require("express");
const cors = require("cors");
const db = require("./models");
const path = require("path");
const routes = require("./routes");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// db.sequelize.sync();

// // ===== For DEV purposes =====
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
