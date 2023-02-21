const shoes = require("../models/shoes");
const Shoe = require("../models/shoes");

//get all shoes => /api/v1/shoes

exports.getShoes = async (req, res, next) => {
  const shoes = await Shoe.find();

  res
    .status(200)
    .json({ success: true, results: shoes.length, data: { shoes } });
};

//create a new job ==> /api/v1/shoes/new

exports.newShoe = async (req, res, next) => {
  const shoe = await Shoe.create(req.body);

  res.status(200).json({
    success: true,
    message: "New shoe added",
    data: shoe,
  });
};
