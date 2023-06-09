const express = require("express");
const app = express();
const marketRouter = express.Router();
const { MarketModel } = require("../model/market_place.model");
const { OemModel } = require("../model/oem_specs.model");
const { auth } = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");

//Get API
marketRouter.get("", async (req, res) => {
  try {
    const data = await MarketModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

// Post API
marketRouter.post("/add", auth, async (req, res) => {
  const payload = req.body;
  try {
    const data = new MarketModel(payload);
    await data.save();
    res.status(200).send({ msg: "Dealer data added" });
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

//Delete API
marketRouter.delete("/delete/:id", auth, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  const { id } = req.params;
  const carDeal = await MarketModel.findOne({ _id: id });
  try {
    if (decoded.userID === carDeal.userID) {
      await MarketModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "Car details are deleted" });
    } else {
      res.status(400).send({ msg: "Not authorised" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

//Patch API
marketRouter.patch("/update/:id", auth, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  const { id } = req.params;
  const carDeal = await MarketModel.findOne({ _id: id });
  const payload = req.body;
  try {
    if (decoded.userID === carDeal.userID) {
      await MarketModel.findByIdAndUpdate({ _id: id }, payload);
      res.status(200).send({ msg: "Car details are updated" });
    } else {
      res.status(400).send({ msg: "Not authorised" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Invalid Request" });
  }
});

module.exports = { marketRouter };
