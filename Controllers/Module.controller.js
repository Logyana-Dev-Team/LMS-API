const mongoose = require("mongoose");
const createError = require("http-errors");
const Module = require("../Models/Module");
const logger = require("../Config/logger");

module.exports = {
  getAllModule: async (req, res, next) => {
    Module.find({})
      .populate("course", "_id name imageName")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  createNewModule: async (req, res, next) => {
    const moduleObj = {
      name: req.body.name,
      course: req.body.course,
      imageName: req.body.imageName,
      price: req.body.price,
      videoName: req.body.videoName,
      description: req.body.description,
    };
    const module = new Module(moduleObj);
    module.save((error, module) => {
      if (error) console.log(error.message);
      if (error) {
        return next(createError(400, error.message));
      }

      if (module) {
        return res.status(201).json({ module });
      }
      next(error);
    });
  },

  findModuleById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const module = await Module.findById(id).populate(
        "course",
        "_id name imageName"
      );

      if (!module) {
        throw createError(404, "Module does not exist.");
      }
      res.send(module);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Module id"));
        return;
      }
      next(error);
    }
  },

  findModuleByCourseId: async (req, res, next) => {
    const id = req.params.id;
    try {
      const module = await Module.find({ course: id });

      if (!module) {
        throw createError(404, "Module does not exist.");
      }
      res.send(module);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Module id"));
        return;
      }
      next(error);
    }
  },

  updateAModule: async (req, res, next) => {
    try {
      const id = req.body._id;
      logger.info(id);
      const updates = req.body;
      const options = { new: true };

      const result = await Module.findByIdAndUpdate(id, updates, options);
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
  },

  deleteAModule: async (req, res, next) => {
    const id = req.body._id;
    try {
      const result = await Module.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Module does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Module id"));
        return;
      }
      next(error);
    }
  },
};
