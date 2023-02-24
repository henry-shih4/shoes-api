const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const upload = require("../middlewares/upload");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
var https = require("https");
var http = require("http");
var fs = require("fs");

// Creating object of key and certificate
// for SSL
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

//import database
const connectDatabase = require("../config/database");

//global error handling
const errorMiddleware = require("../middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

//config
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

//connect to DB
connectDatabase();

//security headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//sanitize data
app.use(mongoSanitize());

//prevent XSS attacks
app.use(xssClean());

//rate limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 min
  max: 100,
});
app.use(limiter);

//setting up cors - access from other domains
app.use(cors());

//setup body parser
app.use(upload.array("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//importing routes
const shoes = require("./routes/shoes");
const auth = require("./routes/auth");
app.use("/api/v1", shoes);
app.use("/api/v1", auth);

//Handle unhandled routes *make sure under app.use
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl}, route not found`, 404));
});

//Middlewares to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
// const server = app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
// });

// https.createServer(options, app).listen(3000, function (req, res) {
//   console.log("Server started at port 3000");
// });

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
