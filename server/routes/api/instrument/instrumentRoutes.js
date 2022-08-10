const router = require("express").Router();
const instrumentController = require("../../../controllers/instrumentController");
const { protect } = require("../../../middleware/authMiddleware");

router.route("/user").get(protect, instrumentController.findUserInstruments);

router
  .route("/:id")
  .get(protect, instrumentController.findById)
  .post(protect, instrumentController.updateById)
  .delete(protect, instrumentController.deleteById);

router
  .route("/")
  .get(instrumentController.findAll)
  .post(protect, instrumentController.create)
  .delete(instrumentController.deleteAll);

module.exports = router;
