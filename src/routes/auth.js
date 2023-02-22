const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);

module.exports = router;
