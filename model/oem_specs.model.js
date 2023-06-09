const mongoose = require("mongoose");

const oemSchema = mongoose.Schema(
  {
    name: String,
    year: Number,
    price: Number,
    colors: Array,
    mileage: Number,
    power: Number,
    max_speed: Number,
  },
  { versionKey: false }
);

const OemModel = mongoose.model("OEM_Specs", oemSchema);

module.exports = { OemModel };
