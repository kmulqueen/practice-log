const router = require("express").Router();
const userController = require("../../../controllers/userController");

router.route("/login").post(userController.authenticateUser);

router
  .route("/:id")
  .get(userController.findById)
  .post(userController.updateById)
  .delete(userController.deleteById);

router
  .route("/")
  .get(userController.findAll)
  .post(userController.create)
  .delete(userController.deleteAll);

module.exports = router;
