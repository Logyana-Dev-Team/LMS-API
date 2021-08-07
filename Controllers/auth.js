require("dotenv").config();
const passport = require("passport");
const logger = require("../middleware/logger");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../Models/Users");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

function validateUser(user) {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().min(5).max(50).required(),
    mobile: Joi.number()
      .integer()
      .min(10)
      .required()
      .messages({ "number.min": "Mobile number should be 10 digits" }),
    password: passwordComplexity(complexityOptions).required(),
    confirm_password: Joi.ref("password"),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const name = req.body.name;
      const email = req.body.email;
      const mobile = req.body.mobile;
      const user1 = {
        name: name,
        email: email,
        mobile: mobile,
        username: username,
        password: password,
      };

      try {
        const response = validateUser(user1);
        if (response.error) {
          logger.error(response.error.details);
          return done({
            message: response.error.details,
          });
        } else {
          const user = await UserModel.create({
            username,
            password,
            name,
            email,
            mobile,
          });
          return done(null, user);
        }
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          done({ message: "User already exist!" });
        }
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(null, false, { message: error });
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token"),
    },
    async (token, done) => {
      const username = token.user.username;
      const user = await UserModel.findOne({ username });
      try {
        return done(null, user);
      } catch (error) {
        done(null, false, { message: "Authentication Failed" });
      }
    }
  )
);
