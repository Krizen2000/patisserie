const couponController = require("../controllers/couponController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();

// router.get("/all", verifyTokenAndAdmin, couponController.getAllCoupon);
// router.get(
//   "/find/:couponName",
//   verifyTokenAndAdmin,
//   couponController.getAllCoupon
// );
// router.post("/", verifyTokenAndAdmin, couponController.createCoupon);
// router.put("/:couponName", verifyTokenAndAdmin, couponController.updateCoupon);
// router.delete(
//   "/:couponName",
//   verifyTokenAndAdmin,
//   couponController.deleteCoupon
// );

router.get("/all", couponController.getAllCoupon);
router.get("/find/:couponName", couponController.getCoupon);
router.post("/", couponController.createCoupon);
router.put("/:couponName", couponController.updateCoupon);
router.delete("/:couponName", couponController.deleteCoupon);

module.exports = router;
