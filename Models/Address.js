const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addresSchema = new Schema(
  {
    poBox: {
      type: String,
      required: false,
    },
    addressLine1: {
      type: String,
      required: false,
    },
    addressLine2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    zip: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const address = mongoose.model("address", addresSchema);

module.exports = address;
