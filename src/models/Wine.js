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
    validate: {
      validator: /^https?|^\/static.+/,
      message: "Invalid image url",
    }
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
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

// wineSchema.path("imageUrl").validate(function () {
//   return this.imageUrl.startsWith("http");
// }, "Invalid image url");

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;
