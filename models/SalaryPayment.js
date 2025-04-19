const mongoose = require('mongoose');

const SalaryPaymentSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paidBy: {
    type: String,
    required: true
  },
  note: String
});

module.exports = mongoose.model('SalaryPayment', SalaryPaymentSchema);
