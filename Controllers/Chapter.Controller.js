const mongoose = require("mongoose");
const createError = require("http-errors");
const Chapter = require("../Models/Chapter");
const logger = require("../Config/logger");

module.exports = {
  getAllChapter: async (req, res, next) => {
    Chapter.find({})
      .populate("course", "_id name imageName")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  createNewChapter: async (req, res, next) => {
    const chapterObj = {
      course: req.body.course,
      module: req.body.module,
      chapterName: req.body.chapterName,
      description: req.body.description,
      videoName: req.body.videoName,
      quiz: req.body.quiz,
    };

    const chapter = new Chapter(chapterObj);
    chapter.save((error, chapter) => {
      if (error) return res.status(400).json({ error });
      if (chapter) {
        return res.status(201).json({ chapter });
      }
    });
  },

  findChapterById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const chapter = await Chapter.findById(id).populate(
        "course module",
        "_id name imageName"
      );

      if (!chapter) {
        throw createError(404, "Chapter does not exist.");
      }
      res.send(chapter);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Chapter id"));
        return;
      }
      next(error);
    }
  },

  findChapterByCourseId: async (req, res, next) => {
    const id = req.params.id;
    try {
      const chapter = await Chapter.find({ course: id });

      if (!chapter) {
        throw createError(404, "Chapter does not exist.");
      }
      res.send(chapter);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Chapter id"));
        return;
      }
      next(error);
    }
  },

  findChapterByModuleId: async (req, res, next) => {
    const id = req.params.id;
    try {
      const chapter = await Chapter.find({ module: id });
      logger.info(chapter);

      if (!chapter) {
        throw createError(404, "Chapter does not exist.");
      }
      res.send(chapter);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Chapter id"));
        return;
      }
      next(error);
    }
  },

  updateAChapter: async (req, res, next) => {
    try {
      const id = req.body._id;
      const updates = req.body;
      const options = { new: true };

      const result = await Chapter.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Chapter does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Chapter Id"));
      }

      next(error);
    }
  },

  deleteAChapter: async (req, res, next) => {
    const id = req.body._id;
    try {
      const result = await Chapter.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Chapter does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Chapter id"));
        return;
      }
      next(error);
    }
  },
};
