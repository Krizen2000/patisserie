const newsLetterController = require("../controllers/newsLetterController");

const router = require("express").Router();

router.get("/all", newsLetterController.getAllNewsLetterClient);
router.post("/", newsLetterController.createNewsLetterClient);
router.delete("/:email", newsLetterController.deleteNewsLetterClient);

module.exports = router;
