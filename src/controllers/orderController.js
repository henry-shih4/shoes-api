const orders = require("../models/orders");
const Order = require("../models/orders");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");

//get all shoes => /api/v1/shoes

exports.getOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      res.status(404).json({ success: false, message: "no orders found" });
    }
    res
      .status(200)
      .json({ success: true, results: orders.length, data: { orders } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create a new shoe => /api/v1/shoes/new

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  console.log(req);
  try {
    let order = new Order({
      products: req.body.products,
      user: req.body.user,
      totalPrice: req.body.totalPrice,
    });

    order = await Order.create(order);
    res
      .status(200)
      .json({ success: true, message: "new order created", data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get a single order => api/v1/order/:id

exports.getOrdersByUserId = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await Order.find({ user: userId });
    if (!orders || orders.length === 0) {
      return next(new ErrorHandler("Orders not found", 404));
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
