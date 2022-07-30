const router = require("express").Router();
const goalRoutes = require("./goal/goalRoutes");
const instrumentRoutes = require("./instrument/instrumentRoutes");
const practiceItemRoutes = require("./practiceItem/practiceItemRoutes");

router.use("/goals", goalRoutes);
router.use("/instruments", instrumentRoutes);
router.use("/practiceitems", practiceItemRoutes);

module.exports = router;
