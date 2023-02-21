const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//config
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const upload = require("../middlewares/upload");

//import database
const connectDatabase = require("../config/database");

//importing routes
const shoes = require("./routes/shoes");

//connect to DB
connectDatabase();

//global error handling
const errorMiddleware = require("../middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

//setup body parser
app.use(upload.array("images"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", shoes);

//Middlewares to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
