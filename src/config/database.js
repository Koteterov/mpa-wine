const mongoose = require("mongoose");
<<<<<<< HEAD
const connectionString = process.env.DB_HOST;
=======

// const connectionString = "mongodb://localhost:27017/winesCollection";
const connectionString = "mongodb+srv://koteterov:TuksamzaAtlas12@mpa-wine.kxcjphs.mongodb.net/winesCollection";
>>>>>>> 91f75c6154c60b57774692887bb20cd9c170397c

exports.initializeDatabase = () => mongoose.connect(connectionString);
