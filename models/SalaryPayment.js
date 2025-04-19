const mongoose = require('mongoose');

const SalaryPaymentSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  Name: String,
  Salary: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
 status:String
});

module.exports = mongoose.model('SalaryPayment', SalaryPaymentSchema);
