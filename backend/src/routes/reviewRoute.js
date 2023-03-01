const reviewController = require("../controllers/reviewController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const router = require("express").Router();

// router.get("/all", reviewController.getAllReviewsHandler);
// router.get("/:productName", reviewController.getReviewsHandler);
// router.post(
//   "/",
//   verifyTokenAndAuthorization,
//   reviewController.createReviewHandler
// );
// router.put(
//   "/:reviewId",
//   verifyTokenAndAuthorization,
//   reviewController.updateReviewHandler
// );
// router.delete(
//   "/:reviewId",
//   verifyTokenAndAuthorization,
//   reviewController.deleteReviewHandler
// );

router.get("/all", reviewController.getAllReviewsHandler);
router.get("/recent", reviewController.getRecentReviewHandler);
router.get("/:reviewId", reviewController.getReviewHandler);
router.get("/product/:productId", reviewController.getReviewViaProductHandler);
router.post("/", reviewController.createReviewHandler);
router.put("/:reviewId", reviewController.updateReviewHandler);
router.delete("/:reviewId", reviewController.deleteReviewHandler);

module.exports = router;
