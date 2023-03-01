const router = require("express").Router();
const addressController = require("../controllers/addressController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

// router.get(
//   "/find/:addressId",
//   verifyTokenAndAuthorization,
//   addressController.getAddress
// );
// router.get(
//   "/:userName",
//   verifyTokenAndAuthorization,
//   addressController.getAllAddresses
// );
// router.post("/", verifyTokenAndAuthorization, addressController.createAddress);
// router.put(
//   "/:addressId",
//   verifyTokenAndAuthorization,
//   addressController.updateAddress
// );
// router.delete(
//   "/:addressId",
//   verifyTokenAndAuthorization,
//   addressController.deleteAddress
// );

router.get("/find/:addressId", addressController.getAddress);
router.get("/:userName", addressController.getAllAddresses);
router.post("/", addressController.createAddress);
router.put("/:addressId", addressController.updateAddress);
router.delete("/:addressId", addressController.deleteAddress);

module.exports = router;
