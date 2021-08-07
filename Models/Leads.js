const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addresSchema = new Schema({
  poBox: {
    type: String,
    required: false,
  },
  addressLine1: {
    type: String,
    required: false,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
});

const leadsSchema = Schema(
  {
    referenceId: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: false,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: [addresSchema],

    createdBy: {
      type: String,
      required: false,
    },

    leadOwner: {
      type: String,
      required: false,
    },

    shareWith: {
      type: String,
      required: false,
    },

    assignLeads: {
      type: String,
      required: false,
    },

    enquiryDate: {
      type: String,
      required: false,
    },

    leadType: {
      type: String,
      required: false,
    },

    financialDetails: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      required: false,
    },

    priority: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("lead", leadsSchema);

module.exports = Lead;
