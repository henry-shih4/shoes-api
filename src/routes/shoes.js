const express = require("express");
const router = express.Router();

const {
  getShoes,
  newShoe,
  getSingleShoe,
} = require("../controllers/shoesController");

router.route("/shoes").get(getShoes);
router.route("/shoes/new").post(newShoe);
router.route("/shoes/:id").get(getSingleShoe);

module.exports = router;
