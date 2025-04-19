const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/invoices', invoiceController.getAllInvoices); // More specific route first
//router.get('/:id', invoiceController.getInvoiceById);      // Keep dynamic route last


module.exports = router;
