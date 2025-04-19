// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🌐 Flexible Cloud Services API is running');
});

const financeRoutes = require('./routes/finance');
app.use('/api/finance', financeRoutes);

// app.js
const purchaseOrderRoutes = require('./routes/purchaseOrders');
app.use('/api/purchase-orders', purchaseOrderRoutes);

// app.js
// const financeRoutes = require('./routes/finance');
// app.use('/api/finance', financeRoutes);


// TODO: Import and mount route files here when created
// Example:
// const purchaseOrderRoutes = require('./routes/purchaseOrders');
// app.use('/api/purchase-orders', purchaseOrderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
