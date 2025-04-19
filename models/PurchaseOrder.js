const mongoose = require('mongoose');

// Purchase Order Schema
const purchaseOrderSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  trainerName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  dailyCost: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0
  },
  trainerCost: {
    type: Number
  }
}, { timestamps: true });

// Calculate the total cost before saving
purchaseOrderSchema.pre('save', async function (next) {
  this.totalCost = this.numberOfDays * this.dailyCost;
  // Set trainer cost as total cost for now, if needed split later
  
  // Find the company to update financials
  const Company = mongoose.model('Company');
  const company = await Company.findOne();

  if (company) {
    // Update company finance summary
    company.financeSummary.cumulativeRevenue += this.totalCost;
    company.financeSummary.cumulativeCost += this.trainerCost;
    company.financeSummary.profit =
      company.financeSummary.cumulativeRevenue - company.financeSummary.cumulativeCost;

    // Save company finance updates
    await company.save();
  }

  next();
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
