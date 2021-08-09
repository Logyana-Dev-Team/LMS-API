require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const httpStatus = require("http-status");
const config = require("./Config/config");
const morgan = require("./Config/morgan");
const { jwtStrategy } = require("./Config/passport");
const { authLimiter } = require("./middleware/rateLimiter");
const { errorConverter, errorHandler } = require("./middleware/error");
const ApiError = require("./Utils/ApiError");
const routes = require("./Routes/v0.1");
const logger = require("./Config/logger");
require("./Connections/Mongoose");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://true-lessons.herokuapp.com/"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info("app running on port:" + PORT);
});
