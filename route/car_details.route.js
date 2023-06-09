const express = require("express");
const carDetailsRouter = express.Router();
const { CarDetailsModel } = require("../model/car_details.model");

//Post API
carDetailsRouter.post("/add", async (req, res) => {
  const paylaod = req.body;
  try {
    const data = new CarDetailsModel(paylaod);
    await data.save();
    res.status(200).send({ msg: "Car-details is added successfully" });
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

//Get API
carDetailsRouter.get("", async (req, res) => {
  const { name } = req.query;
  try {
    const data = await CarDetailsModel.findOne({ title: name });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

module.exports = { carDetailsRouter };
