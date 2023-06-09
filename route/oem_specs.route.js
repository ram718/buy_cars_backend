const express = require("express");
const oemRouter = express.Router();
const { OemModel } = require("../model/oem_specs.model");

//Post API
oemRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const data = new OemModel(payload);
    await data.save();
    res.status(200).send({ msg: "Car spec added successfully" });
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

//Get API
oemRouter.get("", async (req, res) => {
  const { name, year, color } = req.query;
  try {
    if (name) {
      const data = await OemModel.find({ name: name });
      res.status(200).send({ data: data, length: data.length });
    } else if (year) {
      const data = await OemModel.find({ year: year });
      res.status(200).send({ data: data, length: data.length });
    } else if (name && year) {
      const data = await OemModel.find({ name: name, year: year });
      res.status(200).send({ data: data, length: data.length });
    } else if (color) {
      const data = await OemModel.find({ colors: color });
      res.status(200).send(data);
    } else {
      const data = await OemModel.find();
      res.status(200).send({ data: data, length: data.length });
    }
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

module.exports = { oemRouter };
