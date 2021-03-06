const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Quiz = new Schema({
  question: {
    type: String,
  },
  option1: {
    type: String,
  },
  option2: {
    type: String,
  },
  option3: {
    type: String,
  },
  option4: {
    type: String,
  },
  correctOption: {
    type: String,
  },
});

const ChapterScheme = new Schema({
  chapterName: {
    type: String,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "module",
  },
  description: {
    type: String,
  },
  videoName: {
    type: String,
  },
  quiz: [Quiz],
});

const ChapterModel = mongoose.model("chapter", ChapterScheme);

module.exports = ChapterModel;
