const express = require("express");
const router = express.Router();

const { newShoe } = require("../controllers/shoesController");

router.get("/shoes", (req, res) => {
  res.status(200).json({ success: true, message: "This route gets all shoes" });
});

router.route("shoes/new").post(newShoe);

module.exports = router;
