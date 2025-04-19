// controllers/purchaseOrderController.js
const PurchaseOrder = require('../models/PurchaseOrder');

// Create purchase order
exports.createPurchaseOrder = async (req, res) => {
    try {
      const purchaseOrder = new PurchaseOrder(req.body);
      await purchaseOrder.save();
      res.status(201).json(purchaseOrder);
    } catch (error) {
      console.error('❌ Error creating purchase order:', error); // Make sure we log the full error
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  