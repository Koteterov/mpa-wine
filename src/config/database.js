const mongoose = require("mongoose");
const connectionString = process.env.DB_HOST;

exports.initializeDatabase = () => mongoose.connect(connectionString);
