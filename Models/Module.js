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
    require: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

const ModuleModel = mongoose.model("module", ModuleScheme);

module.exports = ModuleModel;
