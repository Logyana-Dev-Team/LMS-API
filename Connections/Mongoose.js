const mongoose = require("mongoose");
const config = require("../Config/config");
const logger = require("../Config/logger");

mongoose
  .connect(
    "mongodb+srv://admin-shubham:suman@20@cluster0.lzrwf.mongodb.net/TrueLessons",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    logger.info("Connected to MongoDB");
  });
