const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./route/user.route");
const { oemRouter } = require("./route/oem_specs.route");
const { marketRouter } = require("./route/market_place.route");
const { carDetailsRouter } = require("./route/car_details.route");

app.use(express.json());
app.use(cors());

app.use("", userRouter);
app.use("/oem", oemRouter);
app.use("/market", marketRouter);
app.use("/carDetails", carDetailsRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`App is running at port ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
