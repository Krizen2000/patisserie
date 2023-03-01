const router = require("express").Router();
const productContoller = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// router.get("/find/:productName", productContoller.getProductHandler);
// router.get("/all", productContoller.getAllProductsHandler);
// router.post("/", verifyTokenAndAdmin, productContoller.createProductHandler);
// router.put(
//   "/:productName",
//   verifyTokenAndAdmin,
//   productContoller.updateProductHandler
// );
// router.delete(
//   "/:productName",
//   verifyTokenAndAdmin,
//   productContoller.deleteProductHandler
// );

router.get("/find/:productId", productContoller.getProductHandler);
router.get("/all", productContoller.getAllProductsHandler);
router.get("/special", productContoller.getSpecialProductsHandler);
router.get(
  "/category/:categoryName",
  productContoller.getProductCategoryHandler
);
router.post("/", productContoller.createProductHandler);
router.put("/:productId", productContoller.updateProductHandler);
router.delete("/:productId", productContoller.deleteProductHandler);

module.exports = router;
