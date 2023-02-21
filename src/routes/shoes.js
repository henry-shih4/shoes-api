const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");
const {
  getShoes,
  newShoe,
  getSingleShoe,
  updateShoe,
} = require("../controllers/shoesController");

router.route("/shoes/new", upload.array("images")).post(newShoe);

router.route("/shoes").get(getShoes);
router.route("/shoes/:id").get(getSingleShoe);
router.route("/shoes/:id").put(updateShoe);
module.exports = router;
