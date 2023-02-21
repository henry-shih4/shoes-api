const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:true,
  },

  color1: {
    color: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  color2: {
    color: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  color3: {
    color: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  color4: {
    color: {
      type: String,
    },
    image: {
      type: String,
    },
  },

  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
});

module.exports = mongoose.model("Shoe", shoeSchema);
