const router = require("express").Router();
const tagController = require("../../../controllers/tagController");
const { protect } = require("../../../middleware/authMiddleware");

router
  .route("/user")
  .get(protect, tagController.getUserTags)
  .delete(protect, tagController.deleteAll);

router.route("/").post(protect, tagController.create);

module.exports = router;
