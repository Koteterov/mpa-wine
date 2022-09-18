const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/winesCollection";
// const connectionString = "mongodb+srv://koteterov:TuksamzaAtlas12@mpa-wine.kxcjphs.mongodb.net/?retryWrites=true&w=majority";

exports.initializeDatabase = () => mongoose.connect(connectionString);
