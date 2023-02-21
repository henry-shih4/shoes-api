const express = require("express");
const app = express();

const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

//importing routes
const shoes = require("./routes/shoes");

app.use("/api/v1", shoes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
