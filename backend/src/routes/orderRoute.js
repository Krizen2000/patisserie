const orderController = require("../controllers/orderController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

// router.get(
//   "/find/:orderId",
//   verifyTokenAndAuthorization,
//   orderController.getOrderHandler
// );
// router.get(
//   "/all",
//   verifyTokenAndAuthorization,
//   orderController.getAllOrdersHandler
// );
// router.get(
//   "/all/:userName",
//   verifyTokenAndAuthorization,
//   orderController.getAllOrdersForUserHandler
// );
// router.post("/", verifyTokenAndAdmin, orderController.createOrderHandler);
// router.put(
//   "/:orderId",
//   verifyTokenAndAdmin,
//   orderController.updateOrderHandler
// );
// router.delete(
//   "/:orderId",
//   verifyTokenAndAuthorization,
//   orderController.deleteOrderHandler
// );

router.get("/find/:orderId", orderController.getOrderHandler);
router.get("/all", orderController.getAllOrdersHandler);
router.get("/recent/:userName", orderController.getRecentOrdersForUserHandler);
router.get("/all/:userName", orderController.getAllOrdersForUserHandler);
router.post("/", orderController.createOrderHandler);
router.put("/:orderId", orderController.updateOrderHandler);
router.delete("/:orderId", orderController.deleteOrderHandler);

module.exports = router;
