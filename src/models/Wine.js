const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    max: 6,
  },
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory",
    },
  ],
});

wineSchema.path("imageUrl").validate(function () {
  return this.imageUrl.startsWith("http");
}, "Invalid url image");

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;
