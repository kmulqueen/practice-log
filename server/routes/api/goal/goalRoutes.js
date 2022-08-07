const router = require("express").Router();
const goalController = require("../../../controllers/goalController");
const { protect } = require("../../../middleware/authMiddleware");

router.route("/user/:userId").get(protect, goalController.findUserGoals);

router
  .route("/:id")
  .get(protect, goalController.findById)
  .post(protect, goalController.updateById)
  .delete(protect, goalController.deleteById);

router
  .route("/")
  .get(goalController.findAll)
  .post(protect, goalController.create)
  .delete(protect, goalController.deleteAll);

module.exports = router;
