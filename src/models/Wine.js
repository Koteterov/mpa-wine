const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
  name: String,
  origin: String,
  imageUrl: String,
  type: String,
  "market-rating": String,
});

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;

