const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../../middlewares/auth");

const {
  getShoes,
  newShoe,
  getSingleShoe,
  updateShoe,
} = require("../controllers/shoesController");

router
  .route("/shoes/new", upload.array("images"))
  .post(isAuthenticatedUser, authorizedRoles("admin"), newShoe);

router.route("/shoes").get(getShoes);
router.route("/shoes/:id").get(getSingleShoe);
router
  .route("/shoes/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateShoe);
module.exports = router;
