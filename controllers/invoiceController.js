const PurchaseOrder = require('../models/PurchaseOrder');
const Employee = require('../models/Employee'); // Import Employee

// exports.getInvoiceById = async (req, res) => {
//   try {
//     const purchaseOrder = await PurchaseOrder.findById(req.params.id);
//     if (!purchaseOrder) {
//       return res.status(404).json({ message: 'Purchase Order not found' });
//     }

//     const trainer = await Employee.findOne({ name: purchaseOrder.trainerName });
//     if (!trainer) {
//       return res.status(404).json({ message: 'Trainer not found in employee records' });
//     }

//     // Construct the enhanced invoice response
//     const invoice = {
//       invoiceId: req.params.id,
//       date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
//       clientDetails: {
//         name: purchaseOrder.clientDetails.name,
//       },
//       courseName: purchaseOrder.courseName,
//       trainer: {
//         name: trainer.name,  // Trainer name from Employee
//         bankDetails: trainer.trainerBankDetails,  // Trainer bank details from Employee
//       },
//       // Course name from PurchaseOrder
//       startDate: purchaseOrder.startDate, // Start date from PurchaseOrder
//       totalCost: purchaseOrder.totalCost, // Total cost from PurchaseOrder
//     };

//     res.status(200).json(invoice); // Return the constructed invoice
//   } catch (error) {
//     console.error('❌ Error fetching invoice:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };




exports.getAllInvoices = async (req, res) => {
    try {
      // Fetch all purchase orders
      const purchaseOrders = await PurchaseOrder.find();
      if (!purchaseOrders || purchaseOrders.length === 0) {
        return res.status(404).json({ message: 'No Purchase Orders found' });
      }
  
      // Map through purchase orders to create invoice responses
      const invoices = await Promise.all(purchaseOrders.map(async (purchaseOrder) => {
        const trainer = await Employee.findOne({ name: purchaseOrder.trainerName });
        if (!trainer) {
          return { message: `Trainer not found for purchase order ${purchaseOrder._id}` };
        }
  
        return {
           // Current date in YYYY-MM-DD format
          clientDetails: {
            name: purchaseOrder.companyName,
          },
          courseName: purchaseOrder.courseName,
          trainer: {
            name: trainer.name,  // Trainer name from Employee
            bankDetails: trainer.trainerBankDetails,  // Trainer bank details from Employee
          },
          startDate: purchaseOrder.startDate, // Start date from PurchaseOrder
          totalCost: purchaseOrder.totalCost, // Total cost from PurchaseOrder
        };
      }));
  
      res.status(200).json(invoices); // Return all constructed invoices
    } catch (error) {
      console.error('❌ Error fetching invoices:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };