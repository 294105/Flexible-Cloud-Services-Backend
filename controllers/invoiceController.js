const PurchaseOrder = require('../models/PurchaseOrder');
const Company = require('../models/Company');
const Employee = require('../models/Employee'); // Import Employee

exports.getInvoiceById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    const company = await Company.findOne();
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const trainer = await Employee.findOne({ name: purchaseOrder.trainerName });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found in employee records' });
    }

    // Enhanced invoice response
    const invoice = {
      invoiceId: req.params.id,
      date: new Date().toISOString().split('T')[0],
      companyDetails: {
        name: company.name,
        address: company.address,
        email: company.email,
        phone: company.phone,
        bankDetails: company.bankDetails
      },
      clientDetails: purchaseOrder.clientDetails,
      trainingDetails: {
        courseName: purchaseOrder.courseName,
        trainerName: purchaseOrder.trainerName,
        startDate: purchaseOrder.startDate,
        numberOfDays: purchaseOrder.numberOfDays,
        dailyCost: purchaseOrder.dailyCost,
        totalCost: purchaseOrder.totalCost,
        trainerBankDetails: trainer.trainerBankDetails // ✅ Mapped here
      }
    };

    res.status(200).json(invoice);
  } catch (error) {
    console.error('❌ Error fetching invoice:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

