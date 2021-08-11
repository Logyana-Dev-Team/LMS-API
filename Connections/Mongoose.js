const mongoose = require("mongoose");
const config = require("../Config/config");
const logger = require("../Config/logger");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  });
