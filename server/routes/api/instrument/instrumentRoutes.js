const router = require("express").Router();
const instrumentController = require("../../../controllers/instrumentController");

router
  .route("/:id")
  .get(instrumentController.findById)
  .post(instrumentController.updateById)
  .delete(instrumentController.deleteById);

router
  .route("/")
  .get(instrumentController.findAll)
  .post(instrumentController.create)
  .delete(instrumentController.deleteAll);

module.exports = router;
