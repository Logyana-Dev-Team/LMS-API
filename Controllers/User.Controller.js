const httpStatus = require("http-status");
const pick = require("../Utils/pick");
const config = require("../Config/config");
const ApiError = require("../Utils/ApiError");
const catchAsync = require("../Utils/catchAsync");
const { userService } = require("../Services");
const logger = require("../Config/logger");
const User = require("../Models/Users");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsers();
  logger.info(result);
  res.send(result);
});

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
};

const enrollModule = catchAsync(async (req, res) => {
  try {
    const id = req.body.userId;
    const updates = { $push: { module: req.body.module } };

    logger.info(req.body);

    const result = await User.updateOne(
      { _id: req.body.userId },
      { $push: { module: { module: req.body.module } } }
    );
    if (!result) {
      throw createError(404, "Module does not exist");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid Module Id"));
    }

    next(error);
  }
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  enrollModule,
};
