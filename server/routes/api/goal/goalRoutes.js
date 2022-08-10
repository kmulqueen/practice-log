const router = require("express").Router();
const goalController = require("../../../controllers/goalController");
const { protect } = require("../../../middleware/authMiddleware");

router.route("/user").get(protect, goalController.findUserGoals);

router
  .route("/:id")
  .get(protect, goalController.findById)
  .post(protect, goalController.updateById)
  .delete(protect, goalController.deleteById);

router
  .route("/")
  .get(protect, goalController.findAll)
  .post(protect, goalController.create)
  .delete(protect, goalController.deleteAll);

module.exports = router;
