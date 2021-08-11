const express = require("express");
const router = express.Router();
const ChapterController = require("../../Controllers/Chapter.Controller");
// const auth = require("../Controllers/auth.conroller");

//Get a list of all Leads
router.get("/", ChapterController.getAllChapter);

//Create a new Lead
router.post("/", ChapterController.createNewChapter);

//Get a Lead by id
router.get("/:id", ChapterController.findChapterById);

//Get a Lead by id
router.get("/getChapter/:id", ChapterController.findChapterByCourseId);

//Get a Lead by id
router.get("/getChapterByModule/:id", ChapterController.findChapterByModuleId);

//Update a Lead by id
router.patch("/", ChapterController.updateAChapter);

//Delete a Lead by id
router.delete("/", ChapterController.deleteAChapter);

module.exports = router;
