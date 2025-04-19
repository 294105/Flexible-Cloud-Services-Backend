const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Only GET route — generate invoice from purchase order
router.get('/:id', invoiceController.getInvoiceById);

module.exports = router;
