const router = require("express").Router();
const goalRoutes = require("./goal/goalRoutes");
const instrumentRoutes = require("./instrument/instrumentRoutes");
const practiceItemRoutes = require("./practiceItem/practiceItemRoutes");
const userRoutes = require("./user/userRoutes");

router.use("/goals", goalRoutes);
router.use("/instruments", instrumentRoutes);
router.use("/practiceitems", practiceItemRoutes);
router.use("/users", userRoutes);

module.exports = router;
