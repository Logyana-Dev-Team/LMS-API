const mongoose = require("mongoose");
const createError = require("http-errors");
const Leads = require("../Models/Leads");
const Address = require("../Models/Address");
const crypto = require("crypto");

module.exports = {
  getAllLeads: async (req, res, next) => {
    Leads.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  createNewLead: async (req, res, next) => {
    const user = req.user;
    const referenceId = crypto.randomBytes(12).toString("hex").toUpperCase();
    let address = [];
    let finalAddress = {
      poBox: "test",
      addressLine1: "test",
      addressLine2: "test",
      city: "test",
      zip: "test",
      state: "test",
      country: "test",
    };
    let newAddress = new Address(finalAddress);
    address.push(newAddress);

    const lead = new Leads({
      referenceId: referenceId,
      createdBy: user.name,
      leadOwner: user.name,
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      address: address,
    });
    lead
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  findLeadById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const lead = await Leads.findById(id);

      if (!lead) {
        throw createError(404, "Lead does not exist.");
      }
      res.send(lead);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Lead id"));
        return;
      }
      next(error);
    }
  },

  updateALead: async (req, res, next) => {
    try {
      const id = req.body._id;
      const updates = req.body;
      const options = { new: true };

      const result = await Leads.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Lead does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Lead Id"));
      }

      next(error);
    }
  },

  deleteALead: async (req, res, next) => {
    const id = req.body._id;
    try {
      const result = await Leads.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "Lead does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Lead id"));
        return;
      }
      next(error);
    }
  },
};
