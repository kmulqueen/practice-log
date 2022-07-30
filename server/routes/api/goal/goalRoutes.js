const router = require("express").Router();
const goalController = require("../../../controllers/goalController");

router
  .route("/:id")
  .get(goalController.findById)
  .post(goalController.updateById)
  .delete(goalController.deleteById);

router
  .route("/")
  .get(goalController.findAll)
  .post(goalController.create)
  .delete(goalController.deleteAll);

module.exports = router;
