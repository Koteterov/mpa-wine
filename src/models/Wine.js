const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true,
    minlength: 2,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  "market-rating": {
    type: Number,
    min: 1,
    max: 6
  },
});

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;

