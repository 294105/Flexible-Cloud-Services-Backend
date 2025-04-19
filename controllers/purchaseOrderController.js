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
  exports.getAllPurchaseOrders = async (req, res) => {
    try {
      const orders = await PurchaseOrder.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error('❌ Error fetching purchase orders:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  exports.getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('trainer');
        const trainer = purchaseOrder.trainer;
      if (!order) {
        return res.status(404).json({ message: 'Purchase Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error('❌ Error fetching purchase order:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  