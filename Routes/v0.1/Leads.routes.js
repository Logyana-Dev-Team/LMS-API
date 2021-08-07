const express = require("express");
const router = express.Router();
const LeadsController = require("../../Controllers/Leads.Controller");
// const auth = require("../Controllers/auth.conroller");

//Get a list of all Leads
router.get("/", LeadsController.getAllLeads);

//Create a new Lead
router.post("/", LeadsController.createNewLead);

//Get a Lead by id
router.get("/:id", LeadsController.findLeadById);

//Update a Lead by id
router.patch("/", LeadsController.updateALead);

//Delete a Lead by id
router.delete("/", LeadsController.deleteALead);

module.exports = router;
