const router = require("express").Router();
const practiceItemController = require("../../../controllers/practiceItemController");
const { protect } = require("../../../middleware/authMiddleware");

router
  .route("/:id")
  .get(protect, practiceItemController.findById)
  .post(protect, practiceItemController.updateById)
  .delete(protect, practiceItemController.deleteById);

router
  .route("/")
  .get(protect, practiceItemController.findAll)
  .post(protect, practiceItemController.create)
  .delete(protect, practiceItemController.deleteAll);

module.exports = router;
