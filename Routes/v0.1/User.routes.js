const express = require("express");
const auth = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const userValidation = require("../../Validations/user.validation");
const userController = require("../../Controllers/User.Controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth("manageUsers"),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    // auth("getUsers"),
    // validate(userValidation.getUsers),
    userController.getUsers
  );

router
  .route("/:userId")
  .get(
    auth("getUsers"),
    validate(userValidation.getUser),
    userController.getUser
  )
  .patch(
    auth("manageUsers"),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth("manageUsers"),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

router.post("/enroll", userController.enrollModule);

module.exports = router;
