const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

const CourseModel = mongoose.model("course", CourseScheme);

module.exports = CourseModel;
