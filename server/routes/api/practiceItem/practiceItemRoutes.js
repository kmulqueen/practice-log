const router = require("express").Router();
const practiceItemController = require("../../../controllers/practiceItemController");

router
  .route("/:id")
  .get(practiceItemController.findById)
  .post(practiceItemController.updateById)
  .delete(practiceItemController.deleteById);

router
  .route("/")
  .get(practiceItemController.findAll)
  .post(practiceItemController.create)
  .delete(practiceItemController.deleteAll);

module.exports = router;
