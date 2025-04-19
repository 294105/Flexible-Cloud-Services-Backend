const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: String,
  salary: {
    type: Number,
    required: true
  },
  trainerBankDetails: {
    accountHolder: { type: String },
    accountNumber: { type: String},
    bankName: { type: String, required: true },
    ifscCode: { type: String, required: true }
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
