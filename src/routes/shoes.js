const express = require("express");
const router = express.Router();

const { getShoes, newShoe } = require("../controllers/shoesController");

router.route("/shoes").get(getShoes);

router.route("/shoes/new").post(newShoe);

module.exports = router;
