const express = require("express");
const app = express();

//config
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

//import database
const connectDatabase = require("../config/database");

//importing routes
const shoes = require("./routes/shoes");


//connect to DB
connectDatabase();

//setup body parser
app.use(express.json());

app.use("/api/v1", shoes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
