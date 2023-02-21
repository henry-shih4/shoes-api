const shoes = require("../models/shoes");
const Shoe = require("../models/shoes");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");

//get all shoes => /api/v1/shoes

exports.getShoes = catchAsyncErrors(async (req, res, next) => {
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
});

//create a new shoe => /api/v1/shoes/new

exports.newShoe = catchAsyncErrors(async (req, res, next) => {
  let shoe = new Shoe({
    name: req.body.name,
    description: req.body.description,
    color1: { color: req.body.color1 },
    color2: { color: req.body.color2 },
    color3: { color: req.body.color3 },
    color4: { color: req.body.color4 },
    price: req.body.price,
    discount: req.body.discount,
  });

  if (req.files) {
    console.log(req.files);
    shoe.color1.image = req.files[0].path;
    shoe.color2.image = req.files[1].path;
    shoe.color3.image = req.files[2].path;
    shoe.color4.image = req.files[3].path;
  }

  shoe = await Shoe.create(shoe);
  res
    .status(200)
    .json({ success: true, message: "new shoe created", data: shoe });
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

//update a shoe ==> api/v1/shoes/:id

exports.updateShoe = catchAsyncErrors(async (req, res, next) => {
  const shoeId = req.params.id;

  let shoe = await Shoe.findById(shoeId);
  if (!shoe) {
    return next(new ErrorHandler("Shoe not found", 404));
  }

  if (req.file) {
    shoe.color1.image = req.file.path;
  }

  shoe = await Shoe.findByIdAndUpdate(shoeId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: `Shoe ${shoeId} has been updated`,
    data: shoe,
  });
});
