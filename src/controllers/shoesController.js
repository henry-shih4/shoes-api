const shoes = require("../models/shoes");
const Shoe = require("../models/shoes");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");

//get all shoes => /api/v1/shoes

exports.getShoes = async (req, res, next) => {
  try {
    const shoes = await Shoe.find();
    if (!shoes) {
      res.status(404).json({ success: false, message: "no shoes found" });
    }
    res
      .status(200)
      .json({ success: true, results: shoes.length, data: { shoes } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create a new job ==> /api/v1/shoes/new

exports.newShoe = catchAsyncErrors(async (req, res, next) => {
  const shoe = await Shoe.create(req.body);
  res.status(200).json({
    success: true,
    message: "New shoe added",
    data: shoe,
  });
});

//get a single shoe => api/v1/shoes/:id

exports.getSingleShoe = catchAsyncErrors(async (req, res, next) => {
  const shoeId = req.params.id;

  const shoe = await Shoe.findById(shoeId);
  if (!shoe || shoe.length === 0) {
    return next(new ErrorHandler("Shoe not found", 404));
  }
  res.status(200).json({ success: true, data: shoe });
});
