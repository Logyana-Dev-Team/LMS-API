const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Faculty = new Schema({
  facultyImage: {
    type: String,
  },
});

const CourseScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  facultyImage: [Faculty],
});

const CourseModel = mongoose.model("course", CourseScheme);

module.exports = CourseModel;
