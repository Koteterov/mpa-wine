const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.imageUrl.startsWith("http");
      },
      message: "Invalid url image",
    },
  },
  description: {
    type: String,
    maxLength: 120,
    required: true,
  },
  wines: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Wine",
    },
  ],
});

const Accessory = mongoose.model("Accessory", AccessorySchema);

module.exports = Accessory;
