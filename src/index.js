const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const { initializeDatabase } = require("./config/database");
const { auth } = require("./middlewares/authMiddleware");
const { errorHandler } = require("./middlewares/errorMiddlleware");

const app = express();
const port = process.env.PORT || 5000

require("./config/handlebars")(app);

app.use("/static", express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(auth);
app.use(routes);
app.use(errorHandler);



initializeDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port ${port}` ));
  })
  .catch((err) => {
    console.log("cannot connect to DB", err);
  });
