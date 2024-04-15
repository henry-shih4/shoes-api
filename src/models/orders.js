const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.ObjectId,
        ref: "Shoe",
        required: [true, "An order must belong to a shoe product."],
      },
      name: {
        type: String,
        required: [true, "A product must have a name."],
      },
      color: {
        type: String,
        required: [true, "A product must have a color."],
      },
      image: {
        type: String,
        required: [true, "A product must have an image."],
      },
      quantity: {
        type: Number,
        required: [true, "A product must have a quantity."],
        default: 1,
      },
      price: {
        type: Number,
        require: [true, "A product must have a price."],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A order must have a User Id."],
  },
  totalPrice: {
    type: Number,
    require: [true, "An order must have a total price."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
