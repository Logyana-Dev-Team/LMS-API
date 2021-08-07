const mongoose = require("mongoose");
const createError = require("http-errors");
const Course = require("../Models/Course");
const logger = require("../Config/logger");

module.exports = {
  getAllCourse: async (req, res, next) => {
    Course.find({})
      .then((result) => {
        res.send(result);
        logger.info(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  createNewCourse: async (req, res, next) => {
    const courseObj = {
      name: req.body.name,
      imageName: req.body.imageName,
    };
    const course = new Course(courseObj);
    logger.info(course);
    course.save((error, course) => {
      if (error) return res.status(400).json({ error });
      if (course) {
        return res.status(201).json({ course });
      }
    });
  },

  findCourseById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const course = await Course.findById(id);

      if (!course) {
        throw createError(404, "Course does not exist.");
      }
      res.send(course);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Course id"));
        return;
      }
      next(error);
    }
  },

  updateACourse: async (req, res, next) => {
    try {
      const id = req.body._id;
      const updates = req.body;
      const options = { new: true };

      const result = await Course.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Course does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Course Id"));
      }

      next(error);
    }
  },

  deleteACourse: async (req, res, next) => {
    const id = req.body._id;
    try {
      const result = await Course.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Course does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Course id"));
        return;
      }
      next(error);
    }
  },
};
