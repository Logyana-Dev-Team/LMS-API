const express = require("express");
const router = express.Router();
const CourseController = require("../../Controllers/Course.Controller");
// const auth = require("../Controllers/auth.conroller");

//Get a list of all Leads
router.get("/", CourseController.getAllCourse);

//Create a new Lead
router.post("/", CourseController.createNewCourse);

//Get a Lead by id
router.get("/:id", CourseController.findCourseById);

//Update a Lead by id
router.patch("/", CourseController.updateACourse);

//Delete a Lead by id
router.delete("/", CourseController.deleteACourse);

module.exports = router;
