const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// router.get(
//   "/find/:userName",
//   verifyTokenAndAdmin,
//   userController.getUserHandler
// );
// router.get(
//   "/:userName/reviews",
//   verifyTokenAndAuthorization,
//   userController.getUserReviewsHandler
// );
// router.get("/all", verifyTokenAndAdmin, userController.getAllUsersHandler);
// router.post("/", verifyTokenAndAdmin, userController.createUserHandler);
// router.put(
//   "/:userName",
//   verifyTokenAndAuthorization,
//   userController.updateUserHandler
// );
// router.delete(
//   "/:userName",
//   verifyTokenAndAuthorization,
//   userController.deleteUserHandler
// );

router.get("/find/:userName", userController.getUserHandler);
router.get("/:userName/reviews", userController.getUserReviewsHandler);
router.get("/all", userController.getAllUsersHandler);
router.post("/", userController.createUserHandler);
router.put("/:userName", userController.updateUserHandler);
router.delete("/:userName", userController.deleteUserHandler);

module.exports = router;
