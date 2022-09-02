const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/winesCollection";

exports.initializeDatabase = () => mongoose.connect(connectionString);
