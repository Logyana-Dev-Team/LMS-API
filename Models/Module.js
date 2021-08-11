const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModuleScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  imageName: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  videoName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ModuleModel = mongoose.model("module", ModuleScheme);

module.exports = ModuleModel;
