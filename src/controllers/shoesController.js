const Shoe = require("../models/shoes");

//create a new job ==> /api/v1/shoes/new

exports.newShoe = async (req, res, next) => {
  const shoe = await Shoe.create(req.body);

  res.status(200).json({
    success: true,
    message: "New shoe added",
    data: shoe,
  });
};
