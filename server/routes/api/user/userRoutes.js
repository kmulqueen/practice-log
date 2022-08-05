const router = require("express").Router();
const userController = require("../../../controllers/userController");
const { protect } = require("../../../middleware/authMiddleware");

router.route("/login").post(userController.authenticateUser);

router
  .route("/:id")
  .get(protect, userController.findById)
  .post(protect, userController.updateById)
  .delete(protect, userController.deleteById);

router
  .route("/")
  .get(userController.findAll)
  .post(userController.create)
  .delete(userController.deleteAll);

module.exports = router;
