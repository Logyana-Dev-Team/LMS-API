const express = require("express");
const router = express.Router();
const ModuleController = require("../../Controllers/Module.Controller");
// const auth = require("../Controllers/auth.conroller");

//Get a list of all Leads
router.get("/", ModuleController.getAllModule);

//Create a new Lead
router.post("/", ModuleController.createNewModule);

//Get a Lead by id
router.get("/:id", ModuleController.findModuleById);

//Get a Lead by id
router.get("/getModule/:id", ModuleController.findModuleByCourseId);

//Update a Lead by id
router.patch("/", ModuleController.updateAModule);

//Delete a Lead by id
router.delete("/", ModuleController.deleteAModule);

module.exports = router;
