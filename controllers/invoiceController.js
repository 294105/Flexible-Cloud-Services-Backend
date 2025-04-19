const Invoice = require('../models/Invoice');
const PurchaseOrder = require('../models/PurchaseOrder');
const Company = require('../models/Company');

exports.createInvoice = async (req, res) => {
  try {
    const { purchaseOrderId, clientDetails, dueDate } = req.body;

    const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    const invoice = new Invoice({
      purchaseOrderId,
      clientDetails,
      dueDate
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error('❌ Error creating invoice:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id)
        .populate('purchaseOrderId');
  
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      const company = await Company.findOne();
  
      res.status(200).json({
        invoice,
        company
      });
    } catch (error) {
      console.error('❌ Error fetching invoice:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };