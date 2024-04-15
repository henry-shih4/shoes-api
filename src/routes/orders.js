const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../../middlewares/auth");

const { getOrders, createOrder, getOrdersByUserId   
 } = require("../controllers/orderController");

router.route("/orders").get(isAuthenticatedUser, getOrders);
router.route("/orders").post(isAuthenticatedUser, createOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrdersByUserId);

module.exports = router;


// 63f69beaab56d37d68c33277
// Elevate Pro
// color1
// 1
// 125
// user