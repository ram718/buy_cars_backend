const mongoose = require("mongoose");

const marketSchema = mongoose.Schema(
  {
    name: String,
    year: Number,
    kms_on_odometer: Number,
    major_scratches: Number,
    original_paint: String,
    number_of_accidents: Number,
    number_of_previous_buyers: Number,
    registration_place: String,
    userID: String,
  },
  { versionKey: false }
);

const MarketModel = mongoose.model("market_inventory", marketSchema);

module.exports = { MarketModel };
