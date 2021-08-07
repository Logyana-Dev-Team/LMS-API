const mongoose = require("mongoose");
const config = require("../Config/config");
const logger = require("../Config/logger");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
});
