const mongoose = require("mongoose");
const connectionString = `mongodb+srv://${process.env.DB_USER}mpa-wine.kxcjphs.mongodb.net/winesCollection`;

exports.initializeDatabase = () => mongoose.connect(connectionString);
