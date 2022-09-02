const express = require("express");
const handlebars = require("express-handlebars");
const routes = require('./routes');
const mongoose = require("mongoose");

const app = express();

const url = 'mongodb://localhost:27017/winesCollection';

mongoose.connect(url)
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log('DB error', err);
  })

app.use("/static", express.static("public"));

app.use(express.urlencoded({extended: false}))


app.engine("hbs", handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views")

app.use(routes)

app.listen(5000, () => console.log("Server is listening on port 5000"));
