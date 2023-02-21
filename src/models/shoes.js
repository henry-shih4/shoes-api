const mongoose = require("mongoose");
const validator = require("validator");

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of shoe"],
    trim: true,
    maxlength: [100, "Shoe name cannot exceed 30 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter description of shoe"],
    maxlength: [100, "Shoe description cannot exceed 150 characters"],
  },
  color1: {
    color: {
      type: String,
      required: [true, "Please enter colorway of shoe"],
      maxlength: [15, "Shoe color cannot exceed 15 characters"],
    },
    image: {
      type: String,
      required: [true, "Please enter path to image of shoe"],
      maxlength: [20, "Shoe description cannot exceed 20 characters"],
    },
  },
  color2: {
    color: {
      type: String,
      required: [true, "Please enter colorway of shoe"],
      maxlength: [15, "Shoe color cannot exceed 15 characters"],
    },
    image: {
      type: String,
      required: [true, "Please enter path to image of shoe"],
      maxlength: [20, "Shoe description cannot exceed 20 characters"],
    },
  },
  color3: {
    color: {
      type: String,
      required: [true, "Please enter colorway of shoe"],
      maxlength: [15, "Shoe color cannot exceed 15 characters"],
    },
    image: {
      type: String,
      required: [true, "Please enter path to image of shoe"],
      maxlength: [20, "Shoe description cannot exceed 20 characters"],
    },
  },
  color4: {
    color: {
      type: String,
      required: [true, "Please enter colorway of shoe"],
      maxlength: [15, "Shoe color cannot exceed 15 characters"],
    },
    image: {
      type: String,
      required: [true, "Please enter path to image of shoe"],
      maxlength: [20, "Shoe description cannot exceed 20 characters"],
    },
  },

  price: {
    type: Number,
    required: [true, "Please enter a price for this shoe"],
  },
  discount: {
    type: Number,
    required: [true, "Please enter a discount for this shoe"],
  },
});

module.exports = mongoose.model("Shoe", shoeSchema);
